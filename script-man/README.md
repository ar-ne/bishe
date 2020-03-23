script-man
==========

Script manager

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/script-man.svg)](https://npmjs.org/package/script-man)
[![Downloads/week](https://img.shields.io/npm/dw/script-man.svg)](https://npmjs.org/package/script-man)
[![License](https://img.shields.io/npm/l/script-man.svg)](https://github.com/arnesacnussem/script-man/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g script-man
$ scma COMMAND
running command...
$ scma (-v|--version|version)
script-man/0.0.0 win32-x64 node-v12.14.0
$ scma --help [COMMAND]
USAGE
  $ scma COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`scma dc ACTION [OVERRIDE]`](#scma-dc-action-override)
* [`scma help [COMMAND]`](#scma-help-command)
* [`scma sc [FILE]`](#scma-sc-file)
* [`scma service [FILE]`](#scma-service-file)
* [`scma volume MODE VOLUME FILE`](#scma-volume-mode-volume-file)

## `scma dc ACTION [OVERRIDE]`

docker-compose tools

```
USAGE
  $ scma dc ACTION [OVERRIDE]

ARGUMENTS
  ACTION    (up|down|r) docker-compose action
            'u' for start
            'd' for stop and remove
            'r' for restart with container removed

  OVERRIDE  (dev|production) [default: dev] docker-compose config override

OPTIONS
  -d, --[no-]demo    run in demo
  -v, --[no-]volume  delete named volumes
```

_See code: [src\commands\dc.ts](https://github.com/arnesacnussem/script-man/blob/v0.0.0/src\commands\dc.ts)_

## `scma help [COMMAND]`

display help for scma

```
USAGE
  $ scma help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src\commands\help.ts)_

## `scma sc [FILE]`

describe the command here

```
USAGE
  $ scma sc [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src\commands\sc.ts](https://github.com/arnesacnussem/script-man/blob/v0.0.0/src\commands\sc.ts)_

## `scma service [FILE]`

describe the command here

```
USAGE
  $ scma service [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src\commands\service.ts](https://github.com/arnesacnussem/script-man/blob/v0.0.0/src\commands\service.ts)_

## `scma volume MODE VOLUME FILE`

Docker named volume tools

```
USAGE
  $ scma volume MODE VOLUME FILE

ARGUMENTS
  MODE    (i|e) set work mode,i for import e for export
  VOLUME  volume name
  FILE    file on host
```

_See code: [src\commands\volume.ts](https://github.com/arnesacnussem/script-man/blob/v0.0.0/src\commands\volume.ts)_
<!-- commandsstop -->
