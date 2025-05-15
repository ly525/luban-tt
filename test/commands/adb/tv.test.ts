import {runCommand} from '@oclif/test'
import {expect} from 'chai'
import * as sinon from 'sinon'
import * as childProcess from 'child_process'

describe('adb tv', () => {
  let spawnStub: sinon.SinonStub
  let mockChildProcess: any

  beforeEach(() => {
    // 创建模拟的子进程
    mockChildProcess = {
      stdout: { on: sinon.stub() },
      stderr: { on: sinon.stub() },
      on: sinon.stub(),
      kill: sinon.stub()
    }

    // 模拟spawn函数
    spawnStub = sinon.stub(childProcess, 'spawn').returns(mockChildProcess)
  })

  afterEach(() => {
    // 恢复原始函数
    spawnStub.restore()
  })

  it('应该调用scrcpy命令进行录屏（默认不显示）', async () => {
    // 设置模拟的命令执行结果
    mockChildProcess.on.withArgs('close').yields(0)

    // 执行命令
    const {stdout} = await runCommand('adb tv')

    // 验证输出包含预期的消息
    expect(stdout).to.contain('开始录制手机屏幕')

    // 验证spawn被正确调用
    expect(spawnStub.calledOnce).to.be.true
    expect(spawnStub.firstCall.args[0]).to.equal('scrcpy')
    expect(spawnStub.firstCall.args[1]).to.include('--record')
    expect(spawnStub.firstCall.args[1]).to.include('--no-display')
  })

  it('应该调用scrcpy命令进行录屏并显示屏幕内容', async () => {
    // 设置模拟的命令执行结果
    mockChildProcess.on.withArgs('close').yields(0)

    // 执行命令
    const {stdout} = await runCommand('adb tv --display')

    // 验证输出包含预期的消息
    expect(stdout).to.contain('开始录制手机屏幕')
    expect(stdout).to.contain('屏幕内容将在录制过程中显示')

    // 验证spawn被正确调用
    expect(spawnStub.calledOnce).to.be.true
    expect(spawnStub.firstCall.args[0]).to.equal('scrcpy')
    expect(spawnStub.firstCall.args[1]).to.include('--record')
    expect(spawnStub.firstCall.args[1]).not.to.include('--no-display')
  })
})