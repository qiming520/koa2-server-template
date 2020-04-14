module.exports = {
  // prod
  environment: 'dev',
  // db
  database: {
    dbName: 'accounts',
    host: '192.168.64.2',
    port: 3306,
    user: 'qiming',
    password: 'Lqm1996318'
  },
  security: {
    secretKey: '346eyJjIjoiQ05VWDJxaTkiLCJpIjoiMTIifQDFSGSDAERGASDG534512345DFFS',
    expiresIn: 60 * 60 * 24 * 30 // 一个小时 * 24 * 30
  }
}