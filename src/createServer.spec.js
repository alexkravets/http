'use strict'

const { expect }       = require('chai')
const { jsonRequest }  = require('@kravc/request')
const { createServer } = require('../src')

describe('createServer(handler, port = 3000)', () => {
  const url = 'http://127.0.0.1:3000'

  it('returns JSON result', async () => {
    await createServer(() => ({
      body:       JSON.stringify({ message: 'Hello, world!' }, null, 2),
      statusCode: 200
    }))

    const { statusCode, object } = await jsonRequest(console, { url })

    expect(statusCode).to.eql(200)
    expect(object.message).to.eql('Hello, world!')
  })
})
