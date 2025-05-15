import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('adb', () => {
  it('runs adb cmd', async () => {
    const {stdout} = await runCommand('adb')
    expect(stdout).to.contain('hello world')
  })

  it('runs adb --name oclif', async () => {
    const {stdout} = await runCommand('adb --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
