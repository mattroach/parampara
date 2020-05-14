const { createProxyMiddleware } = require('http-proxy-middleware')

const destinationProxy = createProxyMiddleware({
  target: 'http://localhost:3001',
  changeOrigin: true
})

module.exports = function(app) {
  app.use('/api', destinationProxy)
  app.use('/login', destinationProxy)
  app.use('/logout', destinationProxy)
  app.use('/authCallback', destinationProxy)
}
