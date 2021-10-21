class ExceedTaskCountError extends Error {
  constructor(code, message) {
    super('User tasks count limit is reached');
    this.code = 1008;
    if (code) this.originCode = code;
    if (message) this.originMessage = message;
  }
}

module.exports = ExceedTaskCountError;
