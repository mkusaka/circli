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

1. generate personal access token for your circleci account
   - see: https://circleci.com/docs/2.0/api-intro/#authentication
2. set token to env var
   - `export CIRCLECI_TOKEN="${your api token}"`
   - If you want to run on circleci, set `CIRCLECI_TOKEN` per [project](https://circleci.com/docs/2.0/env-vars/#setting-an-environment-variable-in-a-project) or [context](https://circleci.com/docs/2.0/env-vars/#setting-an-environment-variable-in-a-context)
3. run

```bash
./circli --help
```
