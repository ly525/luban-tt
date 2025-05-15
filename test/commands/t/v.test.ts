import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('t:v', () => {
  it('runs t:v cmd', async () => {
    const {stdout} = await runCommand('t:v')
    expect(stdout).to.contain('hello world')
  })

  it('runs t:v --name oclif', async () => {
    const {stdout} = await runCommand('t:v --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
