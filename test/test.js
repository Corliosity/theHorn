// Declare all necessary libraries here
// Since the project is small we will start off with one test file
// Over time begin moving tests into folder/files describing what funcitons they look for
var assert = require("assert");

// Basic test - Ensure that Mocha is running properly
describe('Array', function() {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    });
  });
});