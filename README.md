ruishi (终端增强工具，取瑞士军刀之意)
=================

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/ruishi.svg)](https://npmjs.org/package/ruishi)
[![Downloads/week](https://img.shields.io/npm/dw/ruishi.svg)](https://npmjs.org/package/ruishi)


<!-- toc -->
* [安装](#安装)
* [命令](#命令)
<!-- tocstop -->
# 安装
```bash
$ npm install -g ruishi
```
### 前置准备
需要提前安装: [adb](https://developer.android.com/tools/adb)  和 [scrcpy](https://github.com/Genymobile/scrcpy)

macOS 系统，通过 brew 安装 adb 和 scrcpy：
```bash
$ brew install scrcpy
# https://zhuanlan.zhihu.com/p/662190715
$ brew install android-platform-tools
```


# 命令
<!-- commands -->
* [`ruishi adb tv`](#ruishi-adb-tv)
* [`ruishi-proxy on`](#ruishi-proxy)

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

_See code: [src/commands/adb/tv.ts](https://github.com/odb/ruishi/blob/v0.0.13/src/commands/adb/tv.ts)_

## `ruishi-proxy`
通过 adb 给手机添加代理，需要提前
1. 安装: [adb](https://developer.android.com/tools/adb)
2. 通过proxyman/charles/fiddler等工具，安装证书

<details>
<summary>点击展开详细说明</summary>

```bash
使用教程
  $ ruishi-proxy on [port] # 开启代理，默认 9090
  $ ruishi-proxy off # 关闭代理
```
</details>
