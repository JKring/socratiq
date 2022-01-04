const Arguments = artifacts.require("Arguments");
const Truth = artifacts.require("Truth");

contract("Arguments", function (debaters) {
  it("should be deployed", async function () {
    await Arguments.deployed();
    return assert.isTrue(true);
  });
  it("should default to betting", async function () {
    const arguments = await Arguments.deployed();
    await arguments.create('Dogs are better than cats', { from: debaters[0] });
    const argumentAddresses = await arguments.requiringReview();
    const status = await arguments.getStatus(argumentAddresses[0]);    
    return assert.equal(status, 0, "new argument status should default to 0");
  });
  it("should be cancelable by moderators", async function () {
    const truth = await Truth.deployed()
    const arguments = await Arguments.deployed();
    await arguments.create('Dogs are better than cats', { from: debaters[0] });
    const argumentAddresses = await arguments.requiringReview();
    await truth.addDebater(debaters[1]);
    await arguments.reject(argumentAddresses[0], { from: debaters[1] });
    const canceledStatus = await arguments.getStatus(argumentAddresses[0]);
    return assert.equal(canceledStatus, 1, "new argument should be canceled");
  });
});
