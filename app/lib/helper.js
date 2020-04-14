function success (res, msg, errorCode) {
  throw new global.errs.Success(res, msg, errorCode)
}

module.exports = { success }