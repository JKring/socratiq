const Sources = artifacts.require('Sources');

contract("Sources", function (debaters) {
  it("should be deployed", async function () {
    await Sources.deployed();
    return assert.isTrue(true);
  });
  it("be placed into the correct scopes with the correct attributes", async function () {
    const sources = await Sources.deployed();
    await sources.create(42, 'https://google.com', { from: debaters[0] });
    const factSourceIds = await sources.forFact(42, { from: debaters[0] });
    const mySourceIds = await sources.mine({ from: debaters[0] });
    assert.equal(factSourceIds.length, mySourceIds.length, "Sources should be queryable by factId and debater");
    assert.equal(factSourceIds[0].toNumber(), mySourceIds[0].toNumber(), "Sources should be queryable by factId and debater");
    const factId = await sources.factIdFor(factSourceIds[0], { from: debaters[0] });
    return assert.equal(factId, 42, "sources should store their factId");
  });
});
