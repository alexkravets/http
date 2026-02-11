const { jsonRequest } = require('@kravc/request')
const { createServer } = require('.')

describe('createServer(handler, port = 3000)', () => {
  const url = 'http://127.0.0.1:3000'
  let server

  beforeEach(async () => {
    server = await createServer(() => ({
      body: JSON.stringify({ message: 'Hello, world!' }, null, 2),
      statusCode: 200
    }))
  })

  afterEach(async () => {
    if (server) {
      await new Promise(resolve => server.close(resolve))
    }
  })

  it('returns JSON result', async () => {
    const { statusCode, object } = await jsonRequest(console, { url })

    expect(statusCode).toEqual(200)
    expect(object.message).toEqual('Hello, world!')
  })
})
