#!/bin/bash
set -e
echo migrate
hydra migrate sql --yes $(printenv DSN)
nohup hydra clients create --endpoint=https://127.0.0.1:4445 --skip-tls-verify --id sso --token-endpoint-auth-method none --grant-types authorization_code,refresh_token,client_credentials,implicit --response-types token,code,id_token --scope openid,sso --callbacks http://localhost:3000/callback > /tmp/nohupo.log &
echo serve
hydra serve all