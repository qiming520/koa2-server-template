const Router = require('koa-router')
const { success } = require('@l/helper')
const { RegisterValidator, BindUserToRoleValidator, PositiveIntegerValidator } = require('@v/validator')
const { User } = require('@models/user')

/**
 * 
 * Auth
 * 权限中间件
 * 编写接口时，按照中间件的用法， 实例化Auth,并调用m
 * new Auth().m
 * 如果接口没有权限码，则用以上方法调用
 * 如果接口有权限码，则： new Auth(权限码).m
 */
const { Auth } = require('@m/auth')
const router = new Router({
  prefix: '/v1/user'
})

// 注册
router.post('/register', async (ctx) => {
  const v = await new RegisterValidator().validate(ctx)

  const user = {
    email: v.get('body.email'),
    password: v.get('body.password2'),
    nickname: v.get('body.nickname')
  }
  await User.createUser(user)
  success()
})


// 绑定角色
router.post('/bindUserToRole', new Auth().m, async (ctx) => {
  const v = await new BindUserToRoleValidator().validate(ctx)
  // 校验器别名，id => art_id
  // const v = await new BindUserToRoleValidator().validate(ctx,{id: art_id}) 

  const user = {
    id: v.get('body.id'),
    role_id: v.get('body.role_id')
  }
  await User.bindUserToRole(user)
  success()
})

// 查找最新的用户（排序）
router.post('/findLatestUser', new Auth().m, async (ctx) => {
  const r = await User.findLatestUser()
  success([r])
})

// 查找所有用户
router.post('/findAllUser', new Auth().m, async (ctx) => {
  const r = await User.findAllUser()
  success(r)
})

// 测试token
router.post('/testToken', new Auth().m, async (ctx) => {
  ctx.body = ctx.auth.uid
})

// 删除用户
router.post('/deleteUser', new Auth().m, async (ctx) => {
  const v = await new PositiveIntegerValidator().validate(ctx)
  await User.deleteUser(v.get('body.id'))
  success([], '删除成功！')
})
module.exports = router