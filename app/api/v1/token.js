const Router = require('koa-router')
const { TokenValidator } = require('@v/validator')
const { success } = require('@l/helper')
const { LoginType } = require('@l/enum')
const { User } = require('@models/user')
const { generateToken } = require('@c/util.js')

const router = new Router({
  prefix: '/v1/token'
})

// 登录
router.post('/login', async (ctx) => {
  const v = await new TokenValidator().validate(ctx)
  let token = await emailLogin(v.get('body.email'), v.get('body.password'))
  let result = [{
    token
  }]
  success(result, '登录成功！')
})

// 获取token
async function emailLogin (email, password) {
  const user = await User.verifyEmailPassword(email, password)
  if (user.roleArr) {
    user.roleArr = (user.roleArr).split(',')
  } else {
    user.roleArr = []
  }
  return generateToken(user.id, user.roleArr)
}
module.exports = router