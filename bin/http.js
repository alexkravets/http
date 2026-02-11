#!/usr/bin/env node

'use strict'

const { existsSync } = require('fs')
const { createServer } = require('../src')

const main = async (path, port) => {
  if (path.endsWith('.ts')) {
    try {
      require('ts-node/register')
    } catch (err) {
      console.error('TypeScript support requires ts-node. Install it with: npm i ts-node')
      process.exit(1)
    }
  }
  const { handler } = require(path)
  await createServer(handler, port)

  console.info(`URL: http://localhost:${port}`)
}

let path = process.argv[2] || './index.js'
const port = process.argv[3] || 3000

let modulePath = process.cwd() + '/' + path

if (!existsSync(modulePath) && path === './index.js') {
  path = './index.ts'
  modulePath = process.cwd() + '/' + path
}

if (!existsSync(modulePath)) {
  console.info('http [path] [port]\n')
  console.info('Options:')
  console.info('  path     Path to the module that exports request handler - default: ./index.js (or ./index.ts)')
  console.info('  port     Start HTTP server on specific port - default: 3000')

  process.exit(1)
}

main(modulePath, port)
