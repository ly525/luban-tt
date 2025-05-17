import {Args, Command, Flags} from '@oclif/core'
import os from 'node:os'
// import { internalIpV4Sync as getIpAddress } from 'internal-ip'
import { $ } from 'zx'

function getLocalIp(): string {
  const ifaces = os.networkInterfaces()
  for (const name of Object.keys(ifaces)) {
    for (const iface of ifaces[name] || []) {
      if (
        iface.family === 'IPv4' &&
        !iface.internal &&
        iface.address !== '127.0.0.1' &&
        iface.address !== '0.0.0.0' &&
        iface.address !== '192.168.0.0'
      ) {
        return iface.address
      }
    }
  }

  return ''
}

export default class Proxy extends Command {
  static args = {
    action: Args.string({default: 'on', description: 'on 或 off', required: false}),
    port: Args.string({default: '9090', description: '端口号', required: false}),
  }
  static description = '设置或取消 Android 设备的 http 代理'
  static examples = [
    `<%= config.bin %> <%= command.id %> on 9090\n设置代理为本机IP:8888`,
    `<%= config.bin %> <%= command.id %> off\n关闭代理`,
    `<%= config.bin %> <%= command.id %> --on --port 9090\n设置代理为本机IP:8888`,
    `<%= config.bin %> <%= command.id %> --off\n关闭代理`,
  ]
  static flags = {
    off: Flags.boolean({description: '关闭代理', exclusive: ['on']}),
    on: Flags.boolean({description: '开启代理', exclusive: ['off']}),
    port: Flags.string({default: '9090', description: '代理端口'}),
  }

  async run(): Promise<void> {
    const {args, flags} = await this.parse(Proxy)
    // 优先解析 args
    let { action, port } = args

    // 如果没传 action，则用 flags
    if (!action) {
      if (flags.on) action = 'on'
      if (flags.off) action = 'off'
    }

    // 如果没传 port，则用 flags
    if (!port) port = flags.port

    if (!action || !['off', 'on'].includes(action)) {
      this.log('请指定 on/off，例如：proxy on 9090 或 proxy --on --port 9090')
      return
    }

    if (action === 'on') {
      const ip = getLocalIp()
      this.log(`本机IP地址: ${ip}`)
      if (!ip) {
        this.error('无法获取本机 IP 地址，请检查网络设置。')
      }

      await $`adb shell settings put global http_proxy ${ip}:${port}`
      const result = (await $`adb shell settings get global http_proxy`).stdout.trim()
      this.log(`代理设置完成，IP地址为: ${ip} 端口为: ${port}`)
      this.log(`当前设备代理: ${result}`)
    } else if (action === 'off') {
      await $`adb shell settings put global http_proxy :0`
      const result = (await $`adb shell settings get global http_proxy`).stdout.trim()
      this.log('代理设置已删除')
      this.log(`当前设备代理: ${result}`)
    }
  }
}