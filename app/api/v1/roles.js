const Router = require('koa-router')
const { success } = require('@l/helper')
const { RoleValidator, ModifyRoleValidator } = require('@v/validator')
const { Roles } = require('@models/roles')
const { Auth } = require('@m/auth')

const router = new Router({
  prefix: '/v1/roles'
})

// 创建角色 -- 10001
router.post('/createRoles', new Auth(10001).m, async (ctx) => {
  const v = await new RoleValidator().validate(ctx)

  const roles = {
    roleName: v.get('body.roleName'),
    roleArr: v.get('body.roleArr')
  }
  await Roles.createRoles(roles)
  success()
})

// 修改角色
router.post('/modifyRoles', new Auth().m, async (ctx) => {
  const v = await new ModifyRoleValidator().validate(ctx)

  const roles = {
    id: v.get('body.id'),
    roleArr: v.get('body.roleArr')
  }
  await Roles.modifyRoles(roles)
  success()
})


module.exports = router