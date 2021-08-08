const chai = require('chai');
const chaiHttp = require('chai-http');
const nock = require('nock');
const supertest = require('supertest');
const app = require('../../server');

// Assertion
chai.should();
chai.use(chaiHttp);

/**
 * Test the GET route
 */
describe('APIs', () => {
  describe('Test GET route /getOverweightCount', () => {
    before(function () {
      nock('https://localhost:3000')
        .get('/getOverweightCount')
        .reply(200, { overweightCount: '1' });
    });
    it('should return the count of patients that are overweight', (done) => {
      supertest(app)
        .get('/getOverweightCount')
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.should.have.property('overweightCount').eq(1);
          done();
        });
    });
    after(function () {
      nock.cleanAll();
    });
  });

  /**
   * Test the POST route
   */
  describe('Test POST route /getOverweightCount', () => {
    before(function () {
      nock('https://localhost:3000')
        .post('/getOverweightCount')
        .reply(400, { error: 'Not Found' });
    });
    it("should return an error message since the endpoint doesn't exist", (done) => {
      supertest(app)
        .post('/getOverweightCount')
        .end((err, response) => {
          response.should.have.status(404);
          response.body.should.have.property('error');
          done();
        });
    });
    after(function () {
      nock.cleanAll();
    });
  });
});
