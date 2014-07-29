var idgen = require('idgen');

module.exports = function (app) {
  app.require('cantina-redis');

  app.tokens = {};

  /**
   * Create a token that will automatically expire.
   *
   * Supported options are:
   *   - `expire` (key TTL, in milliseconds) (default: 15 minutes)
   *   - `len` (token length) (default: 16 characters)
   *   - `prefix`: (required) the redis key prefix (`app_prefix`:tokens:`prefix`:)
   */
  app.tokens.create = function (id, options, cb) {
    var expire = options.expire || 900000 /* 15 minutes */
      , token = idgen(options.len || 16)
      , key = app.redisKey('tokens', options.prefix, token);

    app.redis.PSETEX(key, expire, id, function (err) {
      if (err) return cb(err);
      cb(null, token);
    });
  };

  /**
   * Check the validity of a token and return the associated id.
   *
   * `prefix`: the redis key prefix (`app_prefix`:tokens:`prefix`:)
   */
  app.tokens.check = function (token, prefix, cb) {
    var key = app.redisKey('tokens', prefix, token);
    app.redis.GET(key, cb);
  };

  /**
   * Delete a token.
   *
   * `prefix`: the redis key prefix (`app_prefix`:tokens:`prefix`:)
   */
  app.tokens.delete = function (token, prefix, cb) {
    var key = app.redisKey('tokens', prefix, token);
    app.redis.DEL(key, cb);
  };
};
