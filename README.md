# @kravc/http

Minimal `node.js` HTTP server for web development.

## API

Install:

```sh
npm i --save-dev @kravc/http
```

### Get started

```js
const { createServer } = require('@kravc/http')

await createServer(() => ({
  body:       JSON.stringify({ message: 'Hello, world!' }, null, 2),
  statusCode: 200
}))
```

In case you have module that exports request handler method, e.g `./index.js`,
add `start` script to `package.json`:

```json
"scripts": {
  "start": "http"
}
```

Specify custom module name or port to start server on with options:

```json
"scripts": {
  "start": "http ./module.js 4000"
}
```
