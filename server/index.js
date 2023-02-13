/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * @ Author: willysliang
 * @ Create Time: 2023-02-10 16:08:05
 * @ Modified by: willysliang
 * @ Modified time: 2023-02-13 15:27:14
 * @ Description: 服务器入口文件
 */

const Controller = require('./controller')
const http = require('http')
const server = http.createServer()

const controller = new Controller()

server.on('request', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  if (req.method === 'OPTIONS') {
    res.status = 200
    res.end()
    return
  } else if (req.url === '/verify') {
    await controller.handleVerifyUpload(req, res)
    return
  } else if (req.url === '/merge') {
    await controller.handleMerge(req, res)
    return
  } else if (req.url === '/delete') {
    await controller.deleteFiles(req, res)
  } else if (req.url === '/') {
    await controller.handleFormData(req, res)
  } else {
    res.statusCode = 404
    res.setHeader('content-type', 'text/html;charset=utf-8')
    res.end('404, 你请求的资源在服务器不存在')
  }
})

server.listen(4000, () => console.log('listening port 4000'))
