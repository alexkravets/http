# @kravc/http

Minimal HTTP server for `node.js` web development.

## API

Install:

```sh
npm i --save @kravc/http
```

### Get started

```js
const { createServer } = require('@kravc/http')

await createServer(() => ({
  body:       JSON.stringify({ message: 'Hello, world!' }, null, 2),
  statusCode: 200
}))
```
