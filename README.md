cantina-tokens
==============

Provides generation, validation, and deletion of expirable tokens for Cantina applications.


Provides
--------

- **app.tokens.create(id, options, cb)** - Create a token that will automatically expire.
  - `id {String}`: The id to pair with this token
  - `options {Object}`: A hash containing the following keys:
      - `expire {Number}` (optional expiry time in milliseconds, default is 15 minutes)
      - `len {Number}` (optional token length, default is 16 characters)
      - `prefix {String}` (required redis prefix, final key is `app_prefix`:tokens`prefix`:)
  - `callback {Function}` Receives `err` and the newly generated `token`
- **app.tokens.check(token, prefix, cb)** - Check the validity of a token and return the associated id.
- **app.tokens.delete(token, prefix, cb)** - Delete a token.

- - -

### Developed by [Terra Eclipse](http://www.terraeclipse.com)
Terra Eclipse, Inc. is a nationally recognized political technology and
strategy firm located in Santa Cruz, CA and Washington, D.C.
