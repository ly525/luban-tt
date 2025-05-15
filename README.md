kkk
=================

使用oclif生成的新CLI工具


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/kkk.svg)](https://npmjs.org/package/kkk)
[![Downloads/week](https://img.shields.io/npm/dw/kkk.svg)](https://npmjs.org/package/kkk)


<!-- toc -->
* [使用方法](#usage)
* [命令](#commands)
<!-- tocstop -->
# 使用方法
<!-- usage -->
```sh-session
$ npm install -g kkk
$ kkk COMMAND
running command...
$ kkk (--version)
kkk/0.0.0 darwin-arm64 node-v23.11.0
$ kkk --help [COMMAND]
USAGE
  $ kkk COMMAND
...
```
<!-- usagestop -->
# 命令
<!-- commands -->
* [`kkk hello PERSON`](#kkk-hello-person)
* [`kkk hello world`](#kkk-hello-world)
* [`kkk help [COMMAND]`](#kkk-help-command)
* [`kkk plugins`](#kkk-plugins)
* [`kkk plugins add PLUGIN`](#kkk-plugins-add-plugin)
* [`kkk plugins:inspect PLUGIN...`](#kkk-pluginsinspect-plugin)
* [`kkk plugins install PLUGIN`](#kkk-plugins-install-plugin)
* [`kkk plugins link PATH`](#kkk-plugins-link-path)
* [`kkk plugins remove [PLUGIN]`](#kkk-plugins-remove-plugin)
* [`kkk plugins reset`](#kkk-plugins-reset)
* [`kkk plugins uninstall [PLUGIN]`](#kkk-plugins-uninstall-plugin)
* [`kkk plugins unlink [PLUGIN]`](#kkk-plugins-unlink-plugin)
* [`kkk plugins update`](#kkk-plugins-update)

## `kkk hello PERSON`

打招呼

```
USAGE
  $ kkk hello PERSON -f <value>

ARGUMENTS
  PERSON  向谁打招呼

FLAGS
  -f, --from=<value>  (required) 谁在打招呼

DESCRIPTION
  打招呼

EXAMPLES
  $ kkk hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_查看代码: [src/commands/hello/index.ts](https://github.com/odb/kkk/blob/v0.0.0/src/commands/hello/index.ts)_

## `kkk hello world`

说你好世界

```
USAGE
  $ kkk hello world

DESCRIPTION
  说你好世界

EXAMPLES
  $ kkk hello world
  hello world! (./src/commands/hello/world.ts)
```

_查看代码: [src/commands/hello/world.ts](https://github.com/odb/kkk/blob/v0.0.0/src/commands/hello/world.ts)_

## `kkk help [COMMAND]`

显示odb-cli的帮助信息。

```
USAGE
  $ kkk help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  要显示帮助的命令。

FLAGS
  -n, --nested-commands  在输出中包含所有嵌套命令。

DESCRIPTION
  显示odb-cli的帮助信息。
```

_查看代码: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.28/src/commands/help.ts)_

## `kkk plugins`

列出已安装的插件。

```
USAGE
  $ kkk plugins [--json] [--core]

FLAGS
  --core  显示核心插件。

GLOBAL FLAGS
  --json  以json格式输出。

DESCRIPTION
  列出已安装的插件。

EXAMPLES
  $ kkk plugins
```

_查看代码: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.37/src/commands/plugins/index.ts)_

## `kkk plugins add PLUGIN`

将插件安装到odb-cli中。

```
USAGE
  $ kkk plugins add PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  要安装的插件。

FLAGS
  -f, --force    强制npm获取远程资源，即使磁盘上存在本地副本。
  -h, --help     显示CLI帮助。
  -s, --silent   静默npm输出。
  -v, --verbose  显示详细的npm输出。

GLOBAL FLAGS
  --json  以json格式输出。

DESCRIPTION
  将插件安装到odb-cli中。

  使用npm安装插件。

  用户安装的插件将覆盖核心插件。

  使用ODB_CLI_NPM_LOG_LEVEL环境变量设置npm日志级别。
  使用ODB_CLI_NPM_REGISTRY环境变量设置npm注册表。

ALIASES
  $ kkk plugins add

EXAMPLES
  从npm注册表安装插件。

    $ kkk plugins add myplugin

  从github url安装插件。

    $ kkk plugins add https://github.com/someuser/someplugin

  从github slug安装插件。

    $ kkk plugins add someuser/someplugin
```

## `kkk plugins:inspect PLUGIN...`

显示插件的安装属性。

```
USAGE
  $ kkk plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] 要检查的插件。

FLAGS
  -h, --help     显示CLI帮助。
  -v, --verbose

GLOBAL FLAGS
  --json  以json格式输出。

DESCRIPTION
  显示插件的安装属性。

EXAMPLES
  $ kkk plugins inspect myplugin
```

_查看代码: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.37/src/commands/plugins/inspect.ts)_

## `kkk plugins install PLUGIN`

将插件安装到odb-cli中。

```
USAGE
  $ kkk plugins install PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  要安装的插件。

FLAGS
  -f, --force    强制npm获取远程资源，即使磁盘上存在本地副本。
  -h, --help     显示CLI帮助。
  -s, --silent   静默npm输出。
  -v, --verbose  显示详细的npm输出。

GLOBAL FLAGS
  --json  以json格式输出。

DESCRIPTION
  将插件安装到odb-cli中。

  使用npm安装插件。

  用户安装的插件将覆盖核心插件。

  使用ODB_CLI_NPM_LOG_LEVEL环境变量设置npm日志级别。
  使用ODB_CLI_NPM_REGISTRY环境变量设置npm注册表。

ALIASES
  $ kkk plugins add

EXAMPLES
  从npm注册表安装插件。

    $ kkk plugins install myplugin

  从github url安装插件。

    $ kkk plugins install https://github.com/someuser/someplugin

  从github slug安装插件。

    $ kkk plugins install someuser/someplugin
```

_查看代码: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.37/src/commands/plugins/install.ts)_

## `kkk plugins link PATH`

将插件链接到CLI以进行开发。

```
USAGE
  $ kkk plugins link PATH [-h] [--install] [-v]

ARGUMENTS
  PATH  [default: .] 插件路径

FLAGS
  -h, --help          显示CLI帮助。
  -v, --verbose
      --[no-]install  链接插件后安装依赖项。

DESCRIPTION
  将插件链接到CLI以进行开发。

  链接插件的安装将覆盖用户安装或核心插件。

  例如，如果您有一个带有'hello'命令的用户安装或核心插件，安装带有'hello'命令的链接插件将覆盖用户安装或核心插件实现。这对开发工作很有用。


EXAMPLES
  $ kkk plugins link myplugin
```

_查看代码: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.37/src/commands/plugins/link.ts)_

## `kkk plugins remove [PLUGIN]`

从CLI中移除插件。

```
USAGE
  $ kkk plugins remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  要卸载的插件

FLAGS
  -h, --help     显示CLI帮助。
  -v, --verbose

DESCRIPTION
  从CLI中移除插件。

ALIASES
  $ kkk plugins unlink
  $ kkk plugins remove

EXAMPLES
  $ kkk plugins remove myplugin
```

## `kkk plugins reset`

移除所有用户安装和链接的插件。

```
USAGE
  $ kkk plugins reset [--hard] [--reinstall]

FLAGS
  --hard       除了卸载插件外，还删除node_modules和包管理器相关文件。
  --reinstall  卸载后重新安装所有插件。
```

_查看代码: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.37/src/commands/plugins/reset.ts)_

## `kkk plugins uninstall [PLUGIN]`

从CLI中移除插件。

```
USAGE
  $ kkk plugins uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  要卸载的插件

FLAGS
  -h, --help     显示CLI帮助。
  -v, --verbose

DESCRIPTION
  从CLI中移除插件。

ALIASES
  $ kkk plugins unlink
  $ kkk plugins remove

EXAMPLES
  $ kkk plugins uninstall myplugin
```

_查看代码: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.37/src/commands/plugins/uninstall.ts)_

## `kkk plugins unlink [PLUGIN]`

从CLI中移除插件。

```
USAGE
  $ kkk plugins unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  要卸载的插件

FLAGS
  -h, --help     显示CLI帮助。
  -v, --verbose

DESCRIPTION
  从CLI中移除插件。

ALIASES
  $ kkk plugins unlink
  $ kkk plugins remove

EXAMPLES
  $ kkk plugins unlink myplugin
```

## `kkk plugins update`

更新已安装的插件。

```
USAGE
  $ kkk plugins update [-h] [-v]

FLAGS
  -h, --help     显示CLI帮助。
  -v, --verbose

DESCRIPTION
  更新已安装的插件。
```

_查看代码: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.37/src/commands/plugins/update.ts)_
<!-- commandsstop -->
