const Sequelize = require('sequelize')
const {
  dbName,
  host,
  port,
  user,
  password
} = require('@config/config').database
const sequelize = new Sequelize(dbName, user, password, {
  dialect: 'mysql',
  host,
  port,
  logging: false,
  timezone: '+08:00',
  define: {
    timestamps: true,
    paranoid: true,
    createdAt: 'created_time',
    updatedAt: 'updated_time',
    deletedAt: 'deleted_time',
    underscored: true,
    scopes: {
      //  查询时不查询时间字段
      bh: {
        attributes: {
          exclude: ['created_time', 'updated_time', 'deleted_time']
        }
      }
    }
  }
})

sequelize.sync({
  force: false
})

module.exports = {
  sequelize
}
