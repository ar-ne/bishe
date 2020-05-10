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
* [`scma env [FILE]`](#scma-env-file)
* [`scma help [COMMAND]`](#scma-help-command)
* [`scma sc ACTION [NAME]`](#scma-sc-action-name)
* [`scma v ACTION [NAME] [PATH]`](#scma-v-action-name-path)

## `scma dc ACTION [OVERRIDE]`

docker-compose tools

```
USAGE
  $ scma dc ACTION [OVERRIDE]

ARGUMENTS
  ACTION    (up|down|r|status) docker-compose action
            'up' for start
            'down' for stop and remove
            'r' for restart with container removed
            'status' is an alias of 'docker-compose top'

  OVERRIDE  docker-compose config override
            override docker-compose.yml with docker-compose.<override type>.yml

OPTIONS
  -b, --buildImage   --build when up
  -c, --cwd=cwd      set current working dir for the command
  -d, --[no-]demo    run in demo
  -v, --[no-]volume  delete named volumes
```

_See code: [src\commands\dc.ts](https://github.com/arnesacnussem/script-man/blob/v0.0.0/src\commands\dc.ts)_

## `scma env [FILE]`

describe the command here

```
USAGE
  $ scma env [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src\commands\env.ts](https://github.com/arnesacnussem/script-man/blob/v0.0.0/src\commands\env.ts)_

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

## `scma sc ACTION [NAME]`

Service control

```
USAGE
  $ scma sc ACTION [NAME]

ARGUMENTS
  ACTION  (start|stop|restart|ls|status) [default: ls] action
  NAME    Service name

DESCRIPTION
  services detail is stored in services-control.config.json
     file format:
     [
       {
         name: string;
         type: string;
         options: { [key: string]: any };
       }
     ]
```

_See code: [src\commands\sc.ts](https://github.com/arnesacnussem/script-man/blob/v0.0.0/src\commands\sc.ts)_

## `scma v ACTION [NAME] [PATH]`

Docker named volume tools

```
USAGE
  $ scma v ACTION [NAME] [PATH]

ARGUMENTS
  ACTION  (i|e|ls) [default: ls] set work mode,
          'i' for import
          'e' for export
          'ls' for list

  NAME    volume or project name
          if using project mode,-p flag is needed

  PATH    file or folder on host
          if using project mode,this should be a folder,and -p flag is needed

OPTIONS
  -a, --[no-]show_all  show all, if not set or set to 'no', only show volume with label
  -p, --project        docker-compose project mode,do same action to all volume belong to same project

DESCRIPTION
  Docker volume import/export tools with docker-compose project support
     scma volume ACTION [VOLUME_OR_PROJECT] [FILE_OR_DIR]

     Note: When all optional argument is missing and ACTION is not 'l', it will read ./docker-volume.config.json for 
  config
     	Config file format:
     {
       type: VolumeConfigType; //VOLUME or PROJECT
       name?: string;
       path?: string;
  }
```

_See code: [src\commands\v.ts](https://github.com/arnesacnussem/script-man/blob/v0.0.0/src\commands\v.ts)_
<!-- commandsstop -->
