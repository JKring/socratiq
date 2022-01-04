const Facts = artifacts.require("Facts");
const Truth = artifacts.require("Truth");
const Arguments = artifacts.require("Arguments");

contract("Facts", function (debaters) {
  it("should be deployed", async function () {
    await Facts.deployed();
    return assert.isTrue(true);
  });
  it("be placed into the correct scopes with the correct attributes", async function () {
    const facts = await Facts.deployed();
    await facts.create(42, 'Dogs are funny', true, { from: debaters[0] });
    const argumentFactIds = await facts.forArgument(42, { from: debaters[0] });
    const myFactIds = await facts.mine({ from: debaters[0] });
    assert.equal(myFactIds.length, argumentFactIds.length, "Facts should be queryable by argumentId and debater");
    assert.equal(myFactIds[0].toNumber(), argumentFactIds[0].toNumber(), "Facts should be queryable by argumentId and debater");
    const isSupporting = await facts.isSupporting(argumentFactIds[0], { from: debaters[0] });
    assert.equal(isSupporting, true, "Facts should store their isSupporting");
    const argumentId = await facts.argumentIdFor(argumentFactIds[0], { from: debaters[0] });
    return assert.equal(argumentId, 42, "Facts should store their argumentId");
  });
});
