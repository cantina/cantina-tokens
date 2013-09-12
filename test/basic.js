var assert = require('assert');

describe('basic tokens test', function () {
  var app
    , id = '123'
    , options = {
        expire: 2000,
        len: 8,
        prefix: 'test'
      }
    ;

  before(function (done) {
    app = require('cantina');
    app.boot(function (err) {
      assert.ifError(err);

      app.silence();
      require('../');

      app.start(done);
    });
  });

  after(function (done) {
    app.destroy(done);
  });

  it('can create a token', function (done) {
    app.tokens.create(id, options, function (err, token) {
      assert.ifError(err);
      assert.ok(token);
      assert.equal(token.length, 8);
      app.token = token;
      done();
    });
  });

  it('can validate a token', function (done) {
    app.tokens.check(app.token, options.prefix, function (err, result) {
      assert.ifError(err);
      assert.equal(result, id);
      done();
    });
  });

  it('can delete a token', function (done) {
    app.tokens.delete(app.token, options.prefix, function (err, result) {
      assert.ifError(err);
      assert.equal(result, 1);
      done();
    });
  });

  it('can expire a token', function (done) {
    app.tokens.create('456', options, function (err, token) {
      assert.ifError(err);
      setTimeout(function () {
        app.tokens.check(token, options.prefix, function (err, result) {
          assert.ifError(err);
          assert.equal(result, null);
          done();
        });
      }, options.expire + 1000);
    });
  });
});