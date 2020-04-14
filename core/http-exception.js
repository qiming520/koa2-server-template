class HttpException extends Error {
  constructor(msg = '服务器异常', errorCode = 10000, code = 400) {
    super()
    this.errorCode = errorCode
    this.code = code
    this.msg = msg
  }
}

class ParameterException extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.code = 500
    this.msg = msg || '参数错误！'
    this.errorCode = errorCode || 10000
  }
}

class Success extends HttpException {
  constructor(res, msg, errorCode) {
    super()
    this.code = 200
    this.msg = msg || 'ok'
    this.errorCode = errorCode || 0
    this.result = res || []
  }
}

class NotFound extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.code = 404
    this.msg = msg || '资源未找到！'
    this.errorCode = errorCode || 10000
  }
}

class AuthFailed extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.code = 401
    this.msg = msg || '授权失败！'
    this.errorCode = errorCode || 401
  }
}

class Forbbiden extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.msg = msg || '禁止访问'
    this.errorCode = errorCode || 10006
    this.code = 403
  }
}

class NotFountUser extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.msg = msg || '找不到该用户'
    this.errorCode = errorCode || 10007
    this.code = 200
  }
}
module.exports = { HttpException, ParameterException, Success, NotFound, AuthFailed, Forbbiden, NotFountUser }