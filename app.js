require('module-alias/register')

const Koa = require('koa')
const parse = require('koa-bodyparser')
const cors = require('koa-cors')
const InitManager = require('./core/init')
const catchError = require('./middlewares/exception')


const app = new Koa()
app.use(async (ctx, next) => {
  const start = new Date();				          // 响应开始时间
  let intervals								              // 响应间隔时间
  try {
    await next();
    intervals = new Date() - start
  } catch (error) {
    intervals = new Date() - start
  }
})
app.use(cors())
app.use(catchError)
app.use(parse())

InitManager.initCore(app)


app.listen(3002)