const Koa = require('koa')
const path = require('path')
const webpack = require('webpack')
const { devMiddleware, hotMiddleware } = require('koa-webpack-middleware')
const proxy = require('koa-proxies')
const staticServer = require('koa-static')
const app = new Koa()
const config = require('../webpack.dev.config')
const compiler = webpack(config)

const proxyUrl = 'https://x-agent3.i-counting.cn/'
app.use(staticServer(path.join(__dirname, '../dist')))
app.use(proxy('/api', {target: proxyUrl, changeOrigin: true}))
app.use(devMiddleware(compiler, {
  stats: {
    colors: true
  }
}))

app.use(hotMiddleware(compiler))

app.listen(3003, function () {
  console.log('app listening on port 3003!\n')
})
