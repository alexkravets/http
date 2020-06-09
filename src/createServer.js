'use strict'

const http      = require('http')
const readBody  = require('./readBody')
const { parse } = require('url')

const createServer = (handler, port = 3000) => {
  const server = http.createServer((req, res) => {
    const { url } = req

    req.path = parse(url).pathname

    readBody(req, async (error) => {
      let body
      let headers
      let statusCode

      if (error) {
        body = JSON.stringify(error)
        statusCode = error.statusCode

      } else {
        const result = await handler(req)

        body       = result.body
        headers    = result.headers || {}
        statusCode = result.statusCode
      }

      res.statusCode = statusCode

      if (body) {
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
      }

      for (const name in headers) {
        res.setHeader(name, headers[name])
      }

      res.end(body)
    })
  })

  return new global.Promise(resolve => server.listen(port, () => resolve(server)))
}

module.exports = createServer
