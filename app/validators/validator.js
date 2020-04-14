const { LinValidator, Rule } = require('@c/lin-validator')
const { User } = require('@models/user')
const { LoginType } = require('@l/enum')

// 校验正整数
class PositiveIntegerValidator extends LinValidator {
  constructor() {
    super()
    this.id = [
      new Rule('isInt', '需要是正整数', { min: 1 })
    ]
  }
}

// 注册校验
class RegisterValidator extends LinValidator {
  constructor() {
    super()
    this.email = [
      new Rule('isEmail', '不符合Email规范')
    ]
    this.password1 = [
      new Rule('isLength', '密码至少6个字符，最多32个字符', {
        min: 6,
        max: 32
      }),
      new Rule('matches', '密码不符合规范', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
    ]
    this.password2 = this.password1
    this.nickname = [
      new Rule('isLength', '昵称不符合长度规范', {
        min: 2,
        max: 32
      })
    ]
  }

  validatePassword (vals) {
    const psw1 = vals.body.password1
    const psw2 = vals.body.password2
    if (psw1 !== psw2) {
      throw new Error('两个密码必须相同')
    }
  }

  async validateEmail (vals) {
    const email = vals.body.email
    const user = await User.findOne({
      where: {
        email: email
      }
    })
    if (user) {
      throw new Error('email已存在')
    }
  }
}

// 登录校验token
class TokenValidator extends LinValidator {
  constructor() {
    super()
    this.email = [
      new Rule('isLength', '不符合账号规则', {
        min: 4,
        max: 32
      })
    ]
    this.password = [
      new Rule('isLength', '至少6个字符，至多128个字符', {
        min: 6,
        max: 128
      })
    ]
  }
}

// 校验创建角色
class RoleValidator extends LinValidator {
  constructor() {
    super()
    this.roleName = [
      new Rule('isLength', '不符合账号规则', {
        min: 2,
        max: 32
      })
    ]
    this.roleArr = [
      new Rule('isLength', '至少6个字符，至多128个字符', {
        min: 1,
        max: 128
      })
    ]
  }
}

// 校验修改角色
class ModifyRoleValidator extends LinValidator {
  constructor() {
    super()
    this.id = [
      new Rule('isLength', '不符合ID规则', {
        min: 1,
        max: 32
      })
    ]
    this.roleArr = [
      new Rule('isLength', '至少6个字符，至多128个字符', {
        min: 1,
        max: 128
      })
    ]
  }
}

// 校验用户绑定角色
class BindUserToRoleValidator extends LinValidator {
  constructor() {
    super()
    this.id = [
      new Rule('isLength', '不符合ID规则', {
        min: 1,
        max: 32
      })
    ]
    this.role_id = [
      new Rule('isLength', '不符合角色ID规则', {
        min: 1,
        max: 32
      })
    ]
  }
}

// 校验token是否为空
class NotEmptyValidator extends LinValidator {
  constructor() {
    super()
    this.token = [
      new Rule('isLength', '不允许为空', { min: 1 })
    ]
  }
}
module.exports = {
  PositiveIntegerValidator, RegisterValidator, TokenValidator, RoleValidator, ModifyRoleValidator, BindUserToRoleValidator, NotEmptyValidator
}

