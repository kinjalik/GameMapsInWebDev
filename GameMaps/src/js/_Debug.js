class Debug {
  constructor(isDebug, options) { 
    this.isDebug = Boolean(isDebug);
    this.settings = options || {};
  }

  get status() {
    return this.isDebug;
  }

  set status(newVal) {
    this.isDebug = Boolean(newVal);
  }

  get options() {
    return this.settings;
  }

  set options(obj) {
    if (obj.logging !== undefined) { this.settings.logging = Boolean(obj.logging); }
  }

  log(status, preMessage, messageBody) {
    if (this.status === false || this.settings.logging === false) return false;
    switch (status) {
      case 'error':
        console.error(preMessage, messageBody);
        break;
      case 'warn':
        console.warn(preMessage, messageBody);
        break;
      case 'info':
        console.info(preMessage, messageBody);
        break;
      case 'log':
        console.info(preMessage, messageBody);
        break;
      default:
        console.log(preMessage, messageBody);
    }
  }
}

module.exports = Debug;