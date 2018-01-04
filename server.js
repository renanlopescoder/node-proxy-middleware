const express = require('express')
const proxy = require('http-proxy-middleware')
const app = express()

const projectService = {
  target: 'https://rest-api-node.herokuapp.com',
  changeOrigin: true,
  pathRewrite: {'^/api/list' : '/list/projects'},
}

const nyTimesService = {
  target: "https://api.nytimes.com",
  changeOrigin: true,
  pathRewrite: {'^/books' : '/svc/books/v3/lists/best-sellers/history.json'},
}

nyTimesService.onProxyReq = (proxyReq, req, res) => (
  proxyReq.setHeader('api-key', 'ae3fedf5ff7f4b5ca957a84f75c7b76c')
)

const projectApiProxy = proxy(projectService)
const nyTimesApiProxy = proxy(nyTimesService)

app.use('/api/list', projectApiProxy)
app.use('/books', nyTimesApiProxy)

let port =  process.env.PORT || 3000

app.listen(port, () => console.log('Servidor Iniciado na porta ' + port))
