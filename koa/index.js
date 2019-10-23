const Koa = require('koa')
const fs = require('mz/fs')

const app = new Koa()

app.use(async function (ctx, next) {
  const paths = await fs.readdir('docs')
  const files = await Promise.all(paths.map(path => fs.readFile(`docs/${path}`, 'utf8')))
  console.log(paths, files)
  ctx.type = 'markdown'
  ctx.body = files.join('')
})

app.listen(3004, function() {
  const url = ['127.0.0.1', 'localhost']
  for (const key of url) {
    console.log('koa running at ' + 'http://' + key + ':3004')
  }
})
