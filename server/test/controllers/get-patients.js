const chai = require('chai');
const {
  analysePatientsInformation,
} = require('../../src/routes/controllers/get-patients');
const join = require('path').join;
const { moveFileWithinDir, mockedResponse } = require('../util');

chai.should();

const ROOT_DIR = '../..';
const DATA_DIR = `${ROOT_DIR}/data`;
console.log(join(__dirname,DATA_DIR))

describe('get-patients controller', function () {
  describe('analysePatientsInformation()', function () {
    it('should return detailed patients info', async function () {
      const response = await analysePatientsInformation();
      response.should.be.deep.equal(mockedResponse);
    });
  });

  describe('analysePatientsInformation()', function () {
    before(function () {
      moveFileWithinDir(join(__dirname,DATA_DIR),'data.json','dummy.json');
    });
    it("should reject the promise with message file doesn't exist", async function () {
      try {
        await analysePatientsInformation();
      } catch (err) {
        err.should.equal('File does not exist');
      }
    });
    after(function () {
      moveFileWithinDir(join(__dirname,DATA_DIR),'dummy.json','data.json');
    });
  });
});
