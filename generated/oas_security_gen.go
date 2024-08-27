// Code generated by ogen, DO NOT EDIT.

package client

import (
	"context"
	"net/http"
	"strings"

	"github.com/go-faster/errors"

	"github.com/ogen-go/ogen/ogenerrors"
)

// SecurityHandler is handler for security parameters.
type SecurityHandler interface {
	// HandleAPIKeyHeader handles api_key_header security.
	// Project API tokens are not supported for API v2. Use a personal API token.
	HandleAPIKeyHeader(ctx context.Context, operationName string, t APIKeyHeader) (context.Context, error)
	// HandleAPIKeyQuery handles api_key_query security.
	// DEPRECATED - we will remove this option in the future. Project API tokens are not supported for
	// API v2. Use a personal API token.
	HandleAPIKeyQuery(ctx context.Context, operationName string, t APIKeyQuery) (context.Context, error)
	// HandleBasicAuth handles basic_auth security.
	// HTTP basic authentication. The username should be set as the circle-token value, and the password
	// should be left blank. Note that project tokens are currently not supported on API v2.
	HandleBasicAuth(ctx context.Context, operationName string, t BasicAuth) (context.Context, error)
}

func findAuthorization(h http.Header, prefix string) (string, bool) {
	v, ok := h["Authorization"]
	if !ok {
		return "", false
	}
	for _, vv := range v {
		scheme, value, ok := strings.Cut(vv, " ")
		if !ok || !strings.EqualFold(scheme, prefix) {
			continue
		}
		return value, true
	}
	return "", false
}

func (s *Server) securityAPIKeyHeader(ctx context.Context, operationName string, req *http.Request) (context.Context, bool, error) {
	var t APIKeyHeader
	const parameterName = "Circle-Token"
	value := req.Header.Get(parameterName)
	if value == "" {
		return ctx, false, nil
	}
	t.APIKey = value
	rctx, err := s.sec.HandleAPIKeyHeader(ctx, operationName, t)
	if errors.Is(err, ogenerrors.ErrSkipServerSecurity) {
		return nil, false, nil
	} else if err != nil {
		return nil, false, err
	}
	return rctx, true, err
}
func (s *Server) securityAPIKeyQuery(ctx context.Context, operationName string, req *http.Request) (context.Context, bool, error) {
	var t APIKeyQuery
	const parameterName = "circle-token"
	q := req.URL.Query()
	if !q.Has(parameterName) {
		return ctx, false, nil
	}
	value := q.Get(parameterName)
	t.APIKey = value
	rctx, err := s.sec.HandleAPIKeyQuery(ctx, operationName, t)
	if errors.Is(err, ogenerrors.ErrSkipServerSecurity) {
		return nil, false, nil
	} else if err != nil {
		return nil, false, err
	}
	return rctx, true, err
}
func (s *Server) securityBasicAuth(ctx context.Context, operationName string, req *http.Request) (context.Context, bool, error) {
	var t BasicAuth
	if _, ok := findAuthorization(req.Header, "Basic"); !ok {
		return ctx, false, nil
	}
	username, password, ok := req.BasicAuth()
	if !ok {
		return nil, false, errors.New("invalid basic auth")
	}
	t.Username = username
	t.Password = password
	rctx, err := s.sec.HandleBasicAuth(ctx, operationName, t)
	if errors.Is(err, ogenerrors.ErrSkipServerSecurity) {
		return nil, false, nil
	} else if err != nil {
		return nil, false, err
	}
	return rctx, true, err
}

// SecuritySource is provider of security values (tokens, passwords, etc.).
type SecuritySource interface {
	// APIKeyHeader provides api_key_header security value.
	// Project API tokens are not supported for API v2. Use a personal API token.
	APIKeyHeader(ctx context.Context, operationName string) (APIKeyHeader, error)
	// APIKeyQuery provides api_key_query security value.
	// DEPRECATED - we will remove this option in the future. Project API tokens are not supported for
	// API v2. Use a personal API token.
	APIKeyQuery(ctx context.Context, operationName string) (APIKeyQuery, error)
	// BasicAuth provides basic_auth security value.
	// HTTP basic authentication. The username should be set as the circle-token value, and the password
	// should be left blank. Note that project tokens are currently not supported on API v2.
	BasicAuth(ctx context.Context, operationName string) (BasicAuth, error)
}

func (s *Client) securityAPIKeyHeader(ctx context.Context, operationName string, req *http.Request) error {
	t, err := s.sec.APIKeyHeader(ctx, operationName)
	if err != nil {
		return errors.Wrap(err, "security source \"APIKeyHeader\"")
	}
	req.Header.Set("Circle-Token", t.APIKey)
	return nil
}
func (s *Client) securityAPIKeyQuery(ctx context.Context, operationName string, req *http.Request) error {
	t, err := s.sec.APIKeyQuery(ctx, operationName)
	if err != nil {
		return errors.Wrap(err, "security source \"APIKeyQuery\"")
	}
	q := req.URL.Query()
	q.Set("circle-token", t.APIKey)
	req.URL.RawQuery = q.Encode()
	return nil
}
func (s *Client) securityBasicAuth(ctx context.Context, operationName string, req *http.Request) error {
	t, err := s.sec.BasicAuth(ctx, operationName)
	if err != nil {
		return errors.Wrap(err, "security source \"BasicAuth\"")
	}
	req.SetBasicAuth(t.Username, t.Password)
	return nil
}
