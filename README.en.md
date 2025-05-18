ruishi
=================
> Terminal Enhancement Tool, inspired by Swiss Army Knife, `ruishi` is it's chinese name


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/ruishi.svg)](https://npmjs.org/package/ruishi)
[![Downloads/week](https://img.shields.io/npm/dw/ruishi.svg)](https://npmjs.org/package/ruishi)

<!-- toc -->
* [Installation](#installation)
* [Commands](#commands)
<!-- tocstop -->
# Installation
```bash
$ npm install -g ruishi
```
### Prerequisites
You need to install: [adb](https://developer.android.com/tools/adb) and [scrcpy](https://github.com/Genymobile/scrcpy) in advance.

On macOS, install adb and scrcpy via brew:
```bash
$ brew install scrcpy
# https://zhuanlan.zhihu.com/p/662190715
$ brew install android-platform-tools
```

# Commands
<!-- commands -->
* [`ruishi adb tv`](#ruishi-adb-tv)
* [`ruishi-proxy on`](#ruishi-proxy)

## `ruishi adb tv`

Record Android device screen using scrcpy

<img src="https://i0.hdslb.com/bfs/archive/edce271400deef9848467834ec6c8893bb2b68db.jpg@518w_290h_1c_!web-video-share-cover.avif" />

<details>
<summary>Click to expand for details</summary>

```bash
USAGE
  $ ruishi adb tv [--audio] [--display]

FLAGS
  --[no-]audio    Whether to include audio during recording
  --[no-]display  Whether to display the screen during recording

DESCRIPTION
  Record Android device screen using scrcpy

EXAMPLES
  $ ruishi adb tv
  Start recording, video will be saved in the current directory

  $ ruishi adb tv --no-display
  Start recording without displaying the screen, video will be saved in the current directory

  $ ruishi adb tv --no-audio
  Start recording without audio, video will be saved in the current directory
```

_See code: [src/commands/adb/tv.ts](https://github.com/odb/ruishi/blob/v0.0.13/src/commands/adb/tv.ts)_

</details>

## `ruishi-proxy`
Set proxy for your Android device via adb. Please make sure:
1. [adb](https://developer.android.com/tools/adb) is installed
2. You have installed the certificate via proxyman/charles/fiddler or similar tools

<details>
<summary>Click to expand for details</summary>

```bash
Usage
  $ ruishi-proxy on [port] # Enable proxy, default port is 9090
  $ ruishi-proxy off # Disable proxy
```
</details>