const Argument = artifacts.require("Argument");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Argument", function (/* accounts */) {
  it("should assert true", async function () {
    await Argument.deployed();
    return assert.isTrue(true);
  });
});
