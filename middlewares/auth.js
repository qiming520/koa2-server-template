const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')

// JWT 令牌校验
class Auth {
  constructor(apiRid) {
    this.apiRid = apiRid || null
  }
  get m () {
    return async (ctx, next) => {
      const userToken = basicAuth(ctx.req)
      let errMsg = 'token 不合法'
      if (!userToken || !userToken.name) throw new global.errs.Forbbiden(errMsg)

      try {
        var decode = jwt.verify(userToken.name, global.config.security.secretKey)
      } catch (error) {
        if (error.name == 'TokenExpiredError') {
          errMsg = 'token已过期'
        }
        throw new global.errs.Forbbiden(errMsg)
      }
      const roleArr = decode.roleArr || []
      if (this.apiRid && roleArr.indexOf(this.apiRid + '') < 0) throw new global.errs.Forbbiden('暂无权限!')
      ctx.auth = decode
      await next()
    }
  }
}
module.exports = { Auth }