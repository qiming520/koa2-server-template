const { sequelize } = require('@c/db')

const { Sequelize, Model } = require('sequelize')

class Roles extends Model {
  // 创建角色
  static async createRoles (body) {
    const roles = {
      roleName: body.roleName,
      roleArr: body.roleArr
    }
    await Roles.create(roles)
  }

  // 修改角色
  static async modifyRoles (body) {
    await Roles.update(
      {
        roleArr: body.roleArr
      },
      {
        where: {
          id: body.id
        }
      }
    )
  }
}

// 初始化模型
Roles.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    roleName: Sequelize.STRING(32),
    roleArr: Sequelize.STRING(32)
  },
  {
    sequelize,
    tableName: 'Roles'
  }
)

module.exports = {
  Roles
}