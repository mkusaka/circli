# circli
circleci cli

## install

```bash
bash <(curl https://raw.githubusercontent.com/mkusaka/circli/main/scripts/install.bash)
./circli --version
```

### example
[./.circleci/config.yml](./.circleci/config.yml)

## usage

### generate personal access token
1. generate personal access token for your circleci account
   - see: https://circleci.com/docs/2.0/api-intro/#authentication
2. set token to env var
   - `export CIRCLECI_TOKEN="${your api token}"`
3. run

```bash
./circli --help
```
