import {Command, Flags} from '@oclif/core'
import {exec, spawn} from 'node:child_process'
// import * as fs from 'node:fs'
// eslint-disable-next-line unicorn/import-style
import * as path from 'node:path'

/**
 * brew install scrcpy
 * 录制手机屏幕
 */
export default class Tv extends Command {
  static args = {}
  static description = '使用scrcpy录制手机屏幕'
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

  openVideoFile(filePath: string): void {
    // 打开视频文件
    if (process.platform === 'darwin') {
      exec(`open ${filePath}`)
    } else if (process.platform === 'win32') {
      exec(`start ${filePath}`)
    } else {
      exec(`xdg-open ${filePath}`)
    }
  }

  async run(): Promise<void> {
    const {flags} = await this.parse(Tv)
    const currentDir = process.cwd()
    const outputFile = path.join(currentDir, 'video.mp4')

    this.log('开始录制手机屏幕，视频将保存为: ' + outputFile)
    if (flags.display) {
      this.log('屏幕内容将在录制过程中显示')
    }

    if (flags.audio) {
      this.log('录制将包含音频')
    } else {
      this.log('录制将不包含音频')
    }

    try {
      // 使用scrcpy命令录制屏幕
      const scrcpyArgs = ['--record', outputFile]
      if (!flags.display) {
        scrcpyArgs.push('--no-display')
      }

      if (!flags.audio) {
        scrcpyArgs.push('--no-audio')
      }

      const scrcpy = spawn('scrcpy', scrcpyArgs)

      // 处理命令输出
      scrcpy.stdout.on('data', (data) => {
        this.log(`${data}`)
      })

      scrcpy.stderr.on('data', (data) => {
        this.log(`${data}`)
      })

      // 监听Ctrl+C信号以停止录制
      process.on('SIGINT', () => {
        scrcpy.kill()
        this.log('\n录制已停止，视频已保存到: ' + outputFile)
        this.openVideoFile(outputFile)
        // eslint-disable-next-line n/no-process-exit
        process.exit(0)
      })

      scrcpy.on('close', (code) => {
        if (code === 0) {
          this.log('录制完成，视频已保存到: ' + outputFile)
          this.openVideoFile(outputFile)
        } else {
          this.error(`录制失败，错误代码: ${code}`)
        }
      })

      // 提示用户如何停止录制
      this.log('按 Ctrl+C 停止录制')
    } catch (error) {
      this.error(`执行scrcpy命令失败: ${error}`)
    }
  }
}
