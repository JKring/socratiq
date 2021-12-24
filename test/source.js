const Source = artifacts.require("Source");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Source", function (/* accounts */) {
  it("should assert true", async function () {
    await Source.deployed();
    return assert.isTrue(true);
  });
});
