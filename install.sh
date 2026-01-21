#!/bin/bash
# circli installer script
# Usage: curl -fsSL https://raw.githubusercontent.com/mkusaka/circli/main/install.sh | bash

set -euo pipefail

REPO="mkusaka/circli"
INSTALL_DIR="${CIRCLI_INSTALL_DIR:-/usr/local/bin}"
BINARY_NAME="circli"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
    exit 1
}

# Detect OS
detect_os() {
    local os
    os="$(uname -s)"
    case "$os" in
        Linux*)  echo "linux" ;;
        Darwin*) echo "darwin" ;;
        MINGW*|MSYS*|CYGWIN*) echo "windows" ;;
        *)       error "Unsupported OS: $os" ;;
    esac
}

# Detect architecture
detect_arch() {
    local arch
    arch="$(uname -m)"
    case "$arch" in
        x86_64|amd64) echo "x64" ;;
        aarch64|arm64) echo "arm64" ;;
        *)            error "Unsupported architecture: $arch" ;;
    esac
}

# Check if running on older CPU (no AVX2 support)
is_baseline_cpu() {
    if [[ "$(detect_os)" == "linux" ]] && [[ "$(detect_arch)" == "x64" ]]; then
        if ! grep -q avx2 /proc/cpuinfo 2>/dev/null; then
            return 0
        fi
    fi
    return 1
}

# Get latest release tag
get_latest_version() {
    local version
    version=$(curl -fsSL "https://api.github.com/repos/${REPO}/releases/latest" | grep '"tag_name"' | sed -E 's/.*"tag_name": *"([^"]+)".*/\1/')
    if [[ -z "$version" ]]; then
        error "Failed to get latest version"
    fi
    echo "$version"
}

# Download and install
install() {
    local os arch version artifact_name download_url tmp_dir

    os=$(detect_os)
    arch=$(detect_arch)
    version="${1:-$(get_latest_version)}"

    info "Detected OS: $os"
    info "Detected architecture: $arch"
    info "Installing version: $version"

    # Determine artifact name
    if [[ "$os" == "windows" ]]; then
        artifact_name="circli-windows-x64.zip"
    else
        if is_baseline_cpu; then
            warn "Detected older CPU without AVX2 support, using baseline build"
            artifact_name="circli-${os}-${arch}-baseline.tar.gz"
        else
            artifact_name="circli-${os}-${arch}.tar.gz"
        fi
    fi

    download_url="https://github.com/${REPO}/releases/download/${version}/${artifact_name}"

    info "Downloading from: $download_url"

    tmp_dir=$(mktemp -d)
    trap "rm -rf $tmp_dir" EXIT

    # Download
    if ! curl -fsSL "$download_url" -o "$tmp_dir/$artifact_name"; then
        error "Failed to download $artifact_name"
    fi

    # Extract
    cd "$tmp_dir"
    if [[ "$artifact_name" == *.zip ]]; then
        unzip -q "$artifact_name"
    else
        tar -xzf "$artifact_name"
    fi

    # Find the binary
    local binary_file
    if [[ "$os" == "windows" ]]; then
        binary_file=$(find . -name "*.exe" -type f | head -1)
    else
        binary_file=$(find . -type f ! -name "*.tar.gz" ! -name "*.zip" | head -1)
    fi

    if [[ -z "$binary_file" ]]; then
        error "Binary not found in archive"
    fi

    # Install
    chmod +x "$binary_file"

    if [[ -w "$INSTALL_DIR" ]]; then
        mv "$binary_file" "$INSTALL_DIR/$BINARY_NAME"
    else
        info "Requesting sudo permission to install to $INSTALL_DIR"
        sudo mv "$binary_file" "$INSTALL_DIR/$BINARY_NAME"
    fi

    info "Successfully installed circli to $INSTALL_DIR/$BINARY_NAME"

    # Verify installation
    if command -v circli &> /dev/null; then
        info "Verifying installation..."
        circli --version || true
    else
        warn "circli is installed but not in PATH. Add $INSTALL_DIR to your PATH."
    fi

    echo ""
    info "Installation complete!"
    echo ""
    echo "To get started, run:"
    echo "  circli config set api-token <your-circleci-api-token>"
    echo "  circli --help"
}

# Parse arguments
VERSION=""
while [[ $# -gt 0 ]]; do
    case $1 in
        -v|--version)
            VERSION="$2"
            shift 2
            ;;
        -d|--dir)
            INSTALL_DIR="$2"
            shift 2
            ;;
        -h|--help)
            echo "circli installer"
            echo ""
            echo "Usage: $0 [options]"
            echo ""
            echo "Options:"
            echo "  -v, --version VERSION  Install specific version (default: latest)"
            echo "  -d, --dir DIR          Install directory (default: /usr/local/bin)"
            echo "  -h, --help             Show this help message"
            echo ""
            echo "Environment variables:"
            echo "  CIRCLI_INSTALL_DIR     Override install directory"
            exit 0
            ;;
        *)
            error "Unknown option: $1"
            ;;
    esac
done

install "$VERSION"
