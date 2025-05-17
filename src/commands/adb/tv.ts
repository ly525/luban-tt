import {Command, Flags} from '@oclif/core'
import * as path from 'node:path'
import {$} from 'zx' // 需要先安装: npm install zx

/**
 * 使用scrcpy录制Android设备屏幕
 *
 * 依赖:
 * - 需要安装scrcpy: brew install scrcpy
 * - 需要安装zx: npm install zx
 *
 * 功能:
 * - 录制手机屏幕并保存为视频文件
 * - 支持显示/隐藏录制过程中的屏幕内容
 * - 支持录制时是否包含音频
 * - 支持按Ctrl+C停止录制并自动打开视频文件
 */
export default class Tv extends Command {
  static args = {}
// 命令描述
  static description = '使用scrcpy录制手机屏幕'
// 使用示例
  static examples = [
    `<%= config.bin %> <%= command.id %>
开始录制手机屏幕，视频将保存在当前目录
`,
    `<%= config.bin %> <%= command.id %> --no-display
开始录制手机屏幕但不显示屏幕内容，视频将保存在当前目录
`,
    `<%= config.bin %> <%= command.id %> --no-audio
开始录制手机屏幕但不录制音频，视频将保存在当前目录
`,
  ]
// 命令参数
  static flags = {
    audio: Flags.boolean({
      allowNo: true,
      default: false,
      description: '是否在录制时包含音频',
    }),
    display: Flags.boolean({
      allowNo: true,
      default: true,
      description: '是否在录制时显示屏幕内容',
    }),
  }

  /**
   * 根据操作系统打开视频文件
   * @param filePath 视频文件路径
   */
  async openVideoFile(filePath: string): Promise<void> {
    try {
      // 根据不同操作系统使用不同的命令打开文件
      if (process.platform === 'darwin') {
        await $`open ${filePath}`
      } else if (process.platform === 'win32') {
        await $`start ${filePath}`
      } else {
        await $`xdg-open ${filePath}`
      }
    } catch (error) {
      this.log(`无法打开视频文件: ${error}`)
    }
  }

  /**
   * 命令执行入口
   */
  async run(): Promise<void> {
    // 解析命令行参数
    const {flags} = await this.parse(Tv)

    // 设置输出文件路径
    const currentDir = process.cwd()
    const timestamp = new Date().toISOString().replaceAll(/[:.]/g, '-')
    const outputFile = path.join(currentDir, `screen-record-${timestamp}.mp4`)

    // 输出录制信息
    this.log('开始录制手机屏幕，视频将保存为: ' + outputFile)
    this.log(`屏幕内容将${flags.display ? '' : '不'}在录制过程中显示`)
    this.log(`录制将${flags.audio ? '' : '不'}包含音频`)
    this.log('按 Ctrl+C 停止录制')

    try {
      // 构建scrcpy命令参数
      const scrcpyArgs = ['--record', outputFile]

      // 根据参数添加选项
      if (!flags.display) scrcpyArgs.push('--no-display')
      if (!flags.audio) scrcpyArgs.push('--no-audio')

      // 使用zx的$.spawn来启动长时间运行的进程
      const scrcpy = $.spawn('scrcpy', scrcpyArgs)

      // 设置进程输出处理
      this.setupProcessOutput(scrcpy)

      // 设置清理函数，用于处理Ctrl+C信号
      const cleanup = async (): Promise<void> => {
        if (scrcpy.pid) {
          process.kill(scrcpy.pid)
          this.log('\n录制已停止，视频已保存到: ' + outputFile)
          await this.openVideoFile(outputFile)
        }

        process.exit(0)
      }

      // 监听SIGINT信号(Ctrl+C)
      process.once('SIGINT', cleanup)

      // 等待进程结束(类似于右上角关闭 scrcpy 窗口)
      await this.waitForProcessEnd(scrcpy, outputFile, cleanup)
    } catch (error) {
      this.error(`执行scrcpy命令失败: ${error}`)
    }
  }

  /**
   * 设置进程输出处理
   * @param scrcpy 进程对象
   */
  setupProcessOutput(scrcpy: any): void {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const handler = (data: Buffer) => {
      this.log(data.toString())
    }

    // scrcpy.stdout.on('data', handler)
    scrcpy.stderr.on('data', handler)
  }

  /**
   * 等待进程结束并处理结果
   * @param scrcpy 进程对象
   * @param outputFile 输出文件路径
   * @param cleanup 清理函数
   */
  waitForProcessEnd(scrcpy: any, outputFile: string, cleanup: () => Promise<void>): Promise<void> {
    return new Promise<void>((resolve) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      scrcpy.on('close', async (code: number) => {
        // 移除信号监听器，避免重复处理
        process.off('SIGINT', cleanup)

        // if (code === 0) {
        //   this.log('录制完成，视频已保存到: ' + outputFile)
        //   await this.openVideoFile(outputFile)
        // } else {
        //   this.error(`录制失败，错误代码: ${code}`)
        // }

        resolve()
      })
    })
  }
}
