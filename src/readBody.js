'use strict'

const readBody = (req, callback) => {
  // NOTE: https://github.com/stream-utils/raw-body/blob/master/index.js
  if (req.method === 'GET') { return callback() }

  let buffer     = []
  let isComplete = false

  const onData = chunk => {
    if (isComplete) { return }
    buffer.push(chunk)
  }

  const done = error => {
    isComplete = true
    callback(error)
    cleanup()
  }

  const onEnd = () => {
    if (isComplete) { return }
    req.body = Buffer.concat(buffer).toString()
    done()
  }

  const onAborted = () => {
    if (isComplete) { return }
    const error = {
      status:     'Bad Request',
      message:    'Request aborted',
      statusCode: 400
    }

    done(error)
  }

  const onError = err => {
    if (isComplete) { return }
    const error = {
      status:     'Bad Request',
      message:    err.message,
      statusCode: 400
    }

    done(error)
  }

  const cleanup = () => {
    buffer = null

    req.removeListener('aborted', onAborted)
    req.removeListener('data', onData)
    req.removeListener('end', onEnd)
    req.removeListener('error', onError)
    req.removeListener('close', cleanup)
  }

  req.on('aborted', onAborted)
  req.on('data', onData)
  req.on('end', onEnd)
  req.on('error', onError)
  req.on('close', cleanup)
}

module.exports = readBody
