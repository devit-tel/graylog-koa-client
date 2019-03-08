# Config
Add following env variable
```
LOGGING_HOST=your.graylog.server.endpoint
LOGGING_PORT=your.graylog.server.port
LOGGING_SERVICE=your-service-api
NODE_ENV=staging
```

# Koa Middleware Config
```javascript
var Koa = require('koa');
var Router = require('koa-router');
var {middleware, info, error} = require('..')

var app = new Koa();
var router = new Router();

router.get('/', (ctx, next) => {
  ctx.logging.start = 1
  info("This is info log")
  ctx.logging.anything = "sfdfdfd" // this is access log data
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
  .use(middleware) // add logging middleware to support ctx.logging
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
```
