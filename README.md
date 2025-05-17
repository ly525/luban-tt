ruishi
=================

使用oclif生成的新CLI工具


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/ruishi.svg)](https://npmjs.org/package/ruishi)
[![Downloads/week](https://img.shields.io/npm/dw/ruishi.svg)](https://npmjs.org/package/ruishi)


<!-- toc -->
* [使用方法](#使用方法)
* [命令](#命令)
<!-- tocstop -->
# 使用方法
<!-- usage -->
```sh-session
$ npm install -g ruishi
$ ruishi COMMAND
running command...
$ ruishi (--version)
ruishi/0.0.4 darwin-arm64 node-v23.11.0
$ ruishi --help [COMMAND]
USAGE
  $ ruishi COMMAND
...
```
<!-- usagestop -->
# 命令
<!-- commands -->
* [`ruishi adb tv`](#ruishi-adb-tv)
* [`ruishi hello PERSON`](#ruishi-hello-person)
* [`ruishi hello world`](#ruishi-hello-world)
* [`ruishi help [COMMAND]`](#ruishi-help-command)
* [`ruishi plugins`](#ruishi-plugins)
* [`ruishi plugins add PLUGIN`](#ruishi-plugins-add-plugin)
* [`ruishi plugins:inspect PLUGIN...`](#ruishi-pluginsinspect-plugin)
* [`ruishi plugins install PLUGIN`](#ruishi-plugins-install-plugin)
* [`ruishi plugins link PATH`](#ruishi-plugins-link-path)
* [`ruishi plugins remove [PLUGIN]`](#ruishi-plugins-remove-plugin)
* [`ruishi plugins reset`](#ruishi-plugins-reset)
* [`ruishi plugins uninstall [PLUGIN]`](#ruishi-plugins-uninstall-plugin)
* [`ruishi plugins unlink [PLUGIN]`](#ruishi-plugins-unlink-plugin)
* [`ruishi plugins update`](#ruishi-plugins-update)

## `ruishi adb tv`

使用scrcpy录制手机屏幕

```
USAGE
  $ ruishi adb tv [--audio] [--display]

FLAGS
  --[no-]audio    是否在录制时包含音频
  --[no-]display  是否在录制时显示屏幕内容

DESCRIPTION
  使用scrcpy录制手机屏幕

EXAMPLES
  $ ruishi adb tv
  开始录制手机屏幕，视频将保存在当前目录

  $ ruishi adb tv --no-display
  开始录制手机屏幕但不显示屏幕内容，视频将保存在当前目录

  $ ruishi adb tv --no-audio
  开始录制手机屏幕但不录制音频，视频将保存在当前目录
```

_See code: [src/commands/adb/tv.ts](https://github.com/odb/ruishi/blob/v0.0.4/src/commands/adb/tv.ts)_

## `ruishi hello PERSON`

Say hello

```
USAGE
  $ ruishi hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ ruishi hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [src/commands/hello/index.ts](https://github.com/odb/ruishi/blob/v0.0.4/src/commands/hello/index.ts)_

## `ruishi hello world`

Say hello world

```
USAGE
  $ ruishi hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ ruishi hello world
  hello world! (./src/commands/hello/world.ts)
```

_See code: [src/commands/hello/world.ts](https://github.com/odb/ruishi/blob/v0.0.4/src/commands/hello/world.ts)_

## `ruishi help [COMMAND]`

Display help for ruishi.

```
USAGE
  $ ruishi help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for ruishi.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.28/src/commands/help.ts)_

## `ruishi plugins`

List installed plugins.

```
USAGE
  $ ruishi plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ ruishi plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.37/src/commands/plugins/index.ts)_

## `ruishi plugins add PLUGIN`

Installs a plugin into ruishi.

```
USAGE
  $ ruishi plugins add PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into ruishi.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the RUISHI_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the RUISHI_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ ruishi plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ ruishi plugins add myplugin

  Install a plugin from a github url.

    $ ruishi plugins add https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ ruishi plugins add someuser/someplugin
```

## `ruishi plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ ruishi plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ ruishi plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.37/src/commands/plugins/inspect.ts)_

## `ruishi plugins install PLUGIN`

Installs a plugin into ruishi.

```
USAGE
  $ ruishi plugins install PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into ruishi.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the RUISHI_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the RUISHI_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ ruishi plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ ruishi plugins install myplugin

  Install a plugin from a github url.

    $ ruishi plugins install https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ ruishi plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.37/src/commands/plugins/install.ts)_

## `ruishi plugins link PATH`

Links a plugin into the CLI for development.

```
USAGE
  $ ruishi plugins link PATH [-h] [--install] [-v]

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ ruishi plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.37/src/commands/plugins/link.ts)_

## `ruishi plugins remove [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ ruishi plugins remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ ruishi plugins unlink
  $ ruishi plugins remove

EXAMPLES
  $ ruishi plugins remove myplugin
```

## `ruishi plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ ruishi plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.37/src/commands/plugins/reset.ts)_

## `ruishi plugins uninstall [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ ruishi plugins uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ ruishi plugins unlink
  $ ruishi plugins remove

EXAMPLES
  $ ruishi plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.37/src/commands/plugins/uninstall.ts)_

## `ruishi plugins unlink [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ ruishi plugins unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ ruishi plugins unlink
  $ ruishi plugins remove

EXAMPLES
  $ ruishi plugins unlink myplugin
```

## `ruishi plugins update`

Update installed plugins.

```
USAGE
  $ ruishi plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.37/src/commands/plugins/update.ts)_
<!-- commandsstop -->
