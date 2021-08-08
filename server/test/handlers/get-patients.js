const chai = require('chai');
const chaiHttp = require('chai-http');
const nock = require('nock');
const supertest = require('supertest');
const app = require('../../server');

// Assertion
chai.should();
chai.use(chaiHttp);

const { mockedResponse } = require('../util');

/**
 * Test the GET route
 */
describe('APIs', () => {
  describe('Test GET route /getPatients', () => {
    before(function () {
      nock('https://localhost:3000')
        .get('/getPatients')
        .reply(200, mockedResponse);
    });
    it('should return the analysed info of patients', (done) => {
      supertest(app)
        .get('/getPatients')
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.an('Array');
          response.body.should.deep.equal(mockedResponse);
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
  describe('Test POST route /getPatients', () => {
    before(function () {
      nock('https://localhost:3000')
        .post('/getOverweightCount')
        .reply(400, { error: 'Not Found' });
    });
    it("should return an error message since the endpoint doesn't exist", (done) => {
      supertest(app)
        .post('/getPatients')
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
    after(function () {
      nock.cleanAll();
    });
  });
});
