import Log from './log'

const execa = require('execa')
export default class SubprocessWrapper {
  constructor(cmd: string | string[], cwd: string | undefined = undefined) {
    if (typeof (cmd) !== 'string')
      cmd = cmd.join(' ')
    if (cmd.length === 0) return false
    Log.info('Script-man run', ` ${cmd} ${cwd ? 'in ' + cwd : ''}`)
    try {
      execa.sync(cmd, {stdio: 'inherit', cwd: cwd ? cwd : process.cwd(), shell: true})
    } catch {
      return false
    }
    return true
  }
}
