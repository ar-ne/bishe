#!/bin/bash
echo migrate
hydra migrate sql --yes $(printenv DSN)
echo serve
hydra serve all