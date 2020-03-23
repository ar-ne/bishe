export default class Config {
  static json = require('../config.json')

  get jsonConfig() {
    return Config.json
  }
}
