// Inspired by: http://neontapir.github.io/coding/professional/2014/01/15/bowling-game-kata-express-node-js/
var request = require('supertest'),
should = require('should'),
game = require('../game.js').app;

describe('root', function() {
  it('should return', function(done) {
    request(game).get('/').expect(200, done);
  });
});

// Helper functions
var roll = function(pins) {
  request(game).post('/bowl/' + pins).end();
};

var rollMany = function(times, pins) {
  for(var i=0;i<times;i++) {
    roll(pins);
  }
};

var assertScoreEquals = function(expected, done) {
  request(game).get('/score').expect(200, function(err,res) {
    if (err) return done(err);
    result = res.body;
    result.should.have.property('score').eql(expected);
    done();
  });
};

describe('in a game of bowling, ', function() {
  beforeEach(function() {
    request(game).get('/start').end();
  });

  describe('gutter game', function() {
    it('should return 0', function(done) {
      rollMany(20,0);
      assertScoreEquals(0, done);
    });
  });

  describe('single pin game', function() {
    it('should return 20', function(done) {
      rollMany(20,1);
      assertScoreEquals(20, done);
    });
  });

  describe('one spare game', function() {
    it('should return 16', function(done) {
      roll(4);
      roll(6); //spare
      roll(3);
      rollMany(17,0);
      assertScoreEquals(16, done);
    });
  });

  describe('one strike game', function() {
    it('should return 28', function(done) {
      roll(10); //strike
      roll(6);
      roll(3);
      rollMany(17,0);
      assertScoreEquals(28, done);
    });
  });

  describe('perfect game', function() {
    it('should return 300', function(done) {
      rollMany(12,10);
      assertScoreEquals(300, done);
    });
  });
});
