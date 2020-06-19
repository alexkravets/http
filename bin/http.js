#!/usr/bin/env node

'use strict'

const { existsSync }   = require('fs')
const { createServer } = require('../src')

const main = async (path, port) => {
  const { handler } = require(path)
  await createServer(handler, port)

  console.info(`URL: http://localhost:${port}`)
}

const path = process.argv[2] || './index.js'
const port = process.argv[3] || 3000

const modulePath = process.cwd() + '/' + path

if (!existsSync(modulePath)) {
  console.info('http [path] [port]\n')
  console.info('Options:')
  console.info('  path     Path to the module that exports request handler - default: ./index.js')
  console.info('  port     Start HTTP server on specific port - default: 3000')

  process.exit(1)
}

main(modulePath, port)
