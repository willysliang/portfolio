/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * @ Author: willysliang
 * @ Create Time: 2023-02-10 16:08:05
 * @ Modified by: willysliang
 * @ Modified time: 2023-02-10 16:33:38
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
  }
  if (req.url === '/verify') {
    await controller.handleVerifyUpload(req, res)
    return
  }

  if (req.url === '/merge') {
    await controller.handleMerge(req, res)
    return
  }

  if (req.url === '/') {
    await controller.handleFormData(req, res)
  }

  if (req.url === '/delete') {
    await controller.deleteFiles(req, res)
  }
})

server.listen(4000, () => console.log('listening port 4000'))
