const bcrypt = require('bcryptjs')
const { sequelize } = require('@c/db')

const { Sequelize, Model } = require('sequelize')

const { Roles } = require('./roles')

class User extends Model {
  // 检查email和密码
  static async verifyEmailPassword (email, plainPassword) {
    const user = await User.findOne({
      where: {
        email
      }
    })
    if (!user) {
      throw new global.errs.NotFound('账号不存在！')
    }
    const correct = bcrypt.compareSync(plainPassword, user.password)
    if (!correct) {
      throw new global.errs.AuthFailed('密码不正确')
    }

    // 查该用户的权限
    let roleArr = []
    if (user.role_id) {
      const role = await Roles.findOne({
        where: {
          id: user.role_id
        }
      })
      roleArr = role.roleArr
    }

    user.roleArr = roleArr
    return user
  }

  // 创建用户
  static async createUser (body) {
    const user = {
      email: body.email,
      password: body.password,
      nickname: body.nickname
    }
    await User.create(user)
  }

  // 绑定角色
  static async bindUserToRole (body) {
    let role = await Roles.findByPk(body.role_id)
    if (!role) throw new global.errs.Forbbiden('暂无改角色！请重新选择角色！')
    let r = await User.update(
      {
        role_id: body.role_id
      },
      {
        where: {
          id: body.id
        }
      }
    )
    if (!r[0]) throw new global.errs.Forbbiden('操作失败！暂无该用户！')
  }

  // 查找最新的用户
  static async findLatestUser () {
    const r = await User.findOne({
      order: [
        ['id', 'DESC']
      ]
    })
    return r
  }

  // 查找所有用户
  static async findAllUser () {
    const r = await User.scope('bh').findAll()
    return r
  }

  // 事务例子：Favor表里面加一条记录，对应的实体表里面喜欢数量加一
  /*static async like (art_id, type, uid) {
    const favor = await favor.findOne({
      where: {
        art_id,
        type,
        uid
      }
    })
    if (favor) {
      throw new global.errs.LikeError()
    }
    // 接下来就是事务操作
    return sequelize.transaction(async t => {
      // 第一步数据库操作 
      await Favor.create({
        art_id,
        type,
        uid
      }, { transaction: t })
      const art = await Art.getData(art_id, type)
      await art.increment('fav_nums', { by: 1, transation: t })
    })
  }*/

  // 软删除和硬删除例子 删除用户
  static async deleteUser (id) {
    console.log('==============================')
    console.log(id)
    console.log('==============================')
    const user = await User.findOne({
      where: {
        id
      }
    })
    console.log('==============================')
    console.log(user)
    console.log('==============================')
    if (!user) {
      throw new global.errs.NotFountUser()
    }
    await user.destroy({
      force: false
    })
  }

}

// 初始化模型
User.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nickname: Sequelize.STRING(32),
    password: {
      // 设计者模式  观察者模式
      type: Sequelize.STRING(64),
      set (val) {
        const salt = bcrypt.genSaltSync(10)
        const psw = bcrypt.hashSync(val, salt)
        this.setDataValue('password', psw)
      }
    },
    email: {
      type: Sequelize.STRING(128),
      unique: true
    },
    role_id: Sequelize.INTEGER
  },
  {
    sequelize,
    tableName: 'user'
  }
)

module.exports = {
  User
}