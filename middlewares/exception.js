const { HttpException } = require('@c/http-exception')
const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    console.log(error)
    const isHttpException = error instanceof HttpException
    const isDev = global.config.enviornment === 'dev'
    if (isDev && !isHttpException) throw error
    if (isHttpException) {
      ctx.body = {
        msg: error.msg,
        errorCode: error.errorCode,
        request: `${ctx.method}  ${ctx.path}`
      }
      if (error.result && error.result.length > 0) ctx.body.result = error.result
      ctx.status = error.code
    } else {
      ctx.body = {
        msg: 'we made a mistake !',
        errorCode: 999,
        request: `${ctx.method}  ${ctx.path}`
      }
      ctx.status = 500
    }
  }
}

module.exports = catchError
