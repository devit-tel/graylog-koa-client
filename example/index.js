require('dotenv').config()
var Koa = require('koa');
var Router = require('koa-router');
var {loggingMiddleware, info, error, configLogger} = require('..')

var app = new Koa();
var router = new Router();

configLogger({
  host: 'your graylog host',
  port: 12201,
  service: 'your service',
  env: process.env.NODE_ENV
})

router.get('/', (ctx, next) => {
  ctx.logging.start = 1
  info("This is info log")
  ctx.logging.anything = "sfdfdfd"
  ctx.body = "Hello"
  ctx.logging.end = 100
  error("This Error Log")
  info("This is info log with data", "sdfd", "dfdf", {c: 3})
});

router.get('/error', (ctx, next) => {
    ctx.logging.currentUser = "John Doe"
    // ... do something
    ctx.logging.anything = "sfdfdfd"
    // ... do something
    throw new Error("Error")
    ctx.body = "Hello"
    ctx.logging.end = 100
  });

app
  .use(loggingMiddleware)
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);