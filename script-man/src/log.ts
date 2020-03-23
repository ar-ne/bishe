import * as chalk from 'chalk'

export default class Log {
  static info(msg0: string, ...msg: string[]) {
    console.log(chalk.greenBright(msg0), chalk.reset(), ...msg)
  }

  static error(msg0: string, ...msg: string[]) {
    console.log(chalk.redBright(msg0), chalk.reset(), ...msg)
    throw new Error(`Exiting...${chalk.gray('don\'t worry,this is intended behaviour')}`)
  }
}
