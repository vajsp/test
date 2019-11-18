let koa = require('koa')
let app = new koa()

app.use(async function (ctx,next) { 
  console.log(1111);
  next()

  console.log(3333);
})

app.use(async function (ctx,next) { 
  console.log(22222);
})

app.listen(8080)