const DebateCoin = artifacts.require("DebateCoin");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("DebateCoin", function (/* accounts */) {
  it("should be deployed", async function () {
    await DebateCoin.deployed();
    return assert.isTrue(true);
  });
});
