import {Args, Command, Flags} from '@oclif/core'
import { $ } from 'zx'

export default class Clipboard extends Command {
  static args = {
    action: Args.string({description: 'get 或 set', required: true}),
    text: Args.string({description: '要写入剪贴板的内容', required: false}),
  }
  static description = '读取或写入安卓设备剪贴板内容（需 adb，推荐配合 clipper app）'
  static examples = [
    `<%= config.bin %> <%= command.id %> get\n读取安卓剪贴板内容（需先安装 clipper）`,
    `<%= config.bin %> <%= command.id %> set "hello world"\n写入剪贴板内容`,
    `<%= config.bin %> <%= command.id %> set --text "你好，世界"\n写入剪贴板内容`,
  ]
  static flags = {
    text: Flags.string({char: 't', description: '要写入剪贴板的内容，仅 set 时有效'}),
  }

  async run(): Promise<void> {
    const {args, flags} = await this.parse(Clipboard)
    const {action} = args
    const text = args.text || flags.text

    // 检查 clipper 是否已安装
    const pmList = (await $`adb shell pm list packages`).stdout
    if (!pmList.includes('org.androidclipper.android')) {
      this.log('请先在安卓设备上安装 clipper（https://github.com/majido/clipper/releases），否则无法正常读写剪贴板！')
      return
    }

    if (action === 'get') {
      // 读取剪贴板内容
      const result = (await $`adb shell am broadcast -a clipper.get`).stdout
      const match = result.match(/data="([^"]*)"/)
      if (match && match[1]) {
        this.log(`安卓剪贴板内容: ${match[1]}`)
      } else {
        this.log('未能读取到剪贴板内容，或内容为空。')
      }
    } else if (action === 'set') {
      if (!text) {
        this.error('请通过参数或 --text 指定要写入剪贴板的内容')
      }

      // 写入剪贴板内容
      await $`adb shell am broadcast -a clipper.set -e text ${text}`
      this.log('已写入安卓剪贴板。')
    } else {
      this.log('action 仅支持 get 或 set')
    }
  }
}