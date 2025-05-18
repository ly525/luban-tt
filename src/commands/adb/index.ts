import {Args, Command, Flags} from '@oclif/core'
import { $ } from 'zx'

export default class Adb extends Command {
  static args = {
    top: Args.string({description: 'show top activity', required: true}),
  }
  static description = 'Say hello'
  static examples = [
    `<%= config.bin %> <%= command.id %> friend --from oclif
hello friend from oclif! (./src/commands/hello/index.ts)
`,
  ]
  // static flags = {
  //   from: Flags.string({char: 'f', description: 'Who is saying hello', required: true}),
  // }

  async run(): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {args, flags} = await this.parse(Adb)

    if (args.top) {
      const result = await $`adb shell "dumpsys activity top | grep ACTIVITY | tail -n 1"`
      this.log('\n\r')
      this.log(`the top activity is:${result.stdout}`)
    }

    // this.log(`hello ${args.top} from ${flags.from}! (./src/commands/hello/index.ts)`)
  }
}
