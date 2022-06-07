const Truth = artifacts.require('Truth');
const Arguments = artifacts.require('Arguments');
const Facts = artifacts.require('Facts');
const Sources = artifacts.require('Sources');

contract('Truth', function (debaters) {
  it('should be deployed', async function () {
    await Truth.deployed();
    return assert.isTrue(true);
  });
  it('should start at 0 for uninitiated Debaters', async function () {
    const truth = await Truth.deployed();
    const score = await truth.getPoints({ from: debaters[0] });
    return assert.equal(score, 0, 'accounts should start with 0 truth');
  });
  it('should allocate to new Debaters', async function () {
    const truth = await Truth.deployed();
    await truth.initAccount({ from: debaters[1] });
    const score = await truth.getPoints({ from: debaters[1] });
    assert.equal(score.valueOf(), 10000, 'new Moderators should be allocated 10000');
    await truth.initAccount({ from: debaters[1] });
    const newestScore = await truth.getPoints({ from: debaters[1] });
    return assert.equal(newestScore.valueOf(), 10000, 'new Moderators not be double allocated');
  });
  it('should allowing scoring Arguments', async function () {
    const truth = await Truth.deployed();
    await truth.initAccount({ from: debaters[1] });
    const arguments = await Arguments.deployed();
    await arguments.create('Dogs are better than cats', { from: debaters[1] });
    const argumentIds = await arguments.requiringReview();
    await arguments.approve(argumentIds[0], { from: debaters[1] });
    await arguments.startDebating(argumentIds[0], { from: debaters[1] });
    const activeArgumentIds = await arguments.active();
    await truth.scoreArgument(activeArgumentIds[0], { from: debaters[1] });
    const currentlyActiveIds = await arguments.active();
    return assert.equal(currentlyActiveIds.length, 0, 'Arguments get removed from active array');
  });
  it("should properly allocate Truth after scoring Arguments", async function () {
    const truth = await Truth.deployed()
    const facts = await Facts.deployed();
    const arguments = await Arguments.deployed();
    const sources = await Sources.deployed();
    const creator = debaters[3]
    await truth.initAccount({ from: creator });
    await arguments.create('Dogs are better than cats', { from: creator });
    const argumentIds = await arguments.requiringReview();
    const argId = argumentIds[0];
    await arguments.approve(argId, { from: creator });
    // TODO: Test betting here!
    await arguments.startDebating(argId, { from: creator });
    ////
    ////                                [Dogs > Cats]
    ////                          +                       -
    ////              [Funny] (3)                           [Smelly] (1)
    ////                ^                                         ^
    //// [FunnyDogs.com] [FakeFunnyDogs.com]      [SmellyDogs.com] [MaybeSmellyDogs.com]
    ////  (1900+, 100-)     (900+, 1100-)          (1900+, 100-)       (1500+, 500-)
    ////
    ////
    await facts.create(argId, 'They are funny', true, { from: creator });
    await facts.create(argId, 'They are too smelly', false, { from: creator });
    const [funnyId, smellyId] = await facts.forArgument(argId);
    const allDebaters = debaters.slice(0, 8)
    const [
      funnySupporterOne,
      funnySupporterTwo,
      randomDebater,
      smellySupporter,
      funnyDogsSupporter,
      fakeFunnyDogsOpposer,
      smellyDogsSupporter,
      maybeSmellyDogsSupporter,
    ] = allDebaters

    await truth.initAccount({ from: funnySupporterOne });
    await truth.initAccount({ from: funnySupporterTwo });
    await truth.initAccount({ from: randomDebater });
    await truth.initAccount({ from: smellySupporter });
    await truth.initAccount({ from: funnyDogsSupporter });
    await truth.initAccount({ from: fakeFunnyDogsOpposer });
    await truth.initAccount({ from: smellyDogsSupporter });
    await truth.initAccount({ from: maybeSmellyDogsSupporter });

    const beforeTruths = {}
    beforeTruths[funnySupporterOne] = await truth.getPoints({ from: funnySupporterOne });
    beforeTruths[funnySupporterTwo] = await truth.getPoints({ from: funnySupporterTwo });
    beforeTruths[randomDebater] = await truth.getPoints({ from: randomDebater });
    beforeTruths[smellySupporter] = await truth.getPoints({ from: smellySupporter });
    beforeTruths[funnyDogsSupporter] = await truth.getPoints({ from: funnyDogsSupporter });
    beforeTruths[fakeFunnyDogsOpposer] = await truth.getPoints({ from: fakeFunnyDogsOpposer });
    beforeTruths[smellyDogsSupporter] = await truth.getPoints({ from: smellyDogsSupporter });
    beforeTruths[maybeSmellyDogsSupporter] = await truth.getPoints({ from: maybeSmellyDogsSupporter });

    await truth.commitToFact(funnyId, { from: funnySupporterOne });
    await truth.commitToFact(funnyId, { from: funnySupporterTwo });
    await truth.commitToFact(funnyId, { from: randomDebater });

    await truth.commitToFact(smellyId, { from: smellySupporter });

    await sources.create(funnyId, 'FunnyDogs.com', { from: creator });
    await sources.create(funnyId, 'FakeFunnyDogs.com', { from: creator });
    const [funnyDogsId, fakeFunnyDogsId] = await sources.forFact(funnyId);
    await truth.commitToSource(funnyDogsId, 1900, true, { from: funnyDogsSupporter });
    await truth.commitToSource(funnyDogsId, 100, false, { from: randomDebater });
    await truth.commitToSource(fakeFunnyDogsId, 900, true, { from: randomDebater });
    await truth.commitToSource(fakeFunnyDogsId, 1100, false, { from: fakeFunnyDogsOpposer });

    await sources.create(smellyId, 'SmellyDogs.com', { from: creator });
    await sources.create(smellyId, 'MaybeSmellyDogs.com', { from: creator });
    const [smellyDogsId, maybeSmellyDogsId] = await sources.forFact(smellyId);
    await truth.commitToSource(smellyDogsId, 1900, true, { from: smellyDogsSupporter });
    await truth.commitToSource(smellyDogsId, 100, false, { from: randomDebater });
    await truth.commitToSource(maybeSmellyDogsId, 1500, true, { from: maybeSmellyDogsSupporter });
    await truth.commitToSource(maybeSmellyDogsId, 500, false, { from: randomDebater });

    await truth.scoreArgument(argId, { from: creator });

    //// Results:
    const funnyScore = await truth.getPoints({ from: funnySupporterOne });
    assert.equal(funnyScore - beforeTruths[funnySupporterOne], 75, 'Funny committers get 75');
    const smellyScore = await truth.getPoints({ from: smellySupporter });
    assert.equal(smellyScore - beforeTruths[smellySupporter], 25, 'Smelly committers get 25');

    const funnyDogsScore = await truth.getPoints({ from: funnyDogsSupporter });
    assert.equal(funnyDogsScore - beforeTruths[funnyDogsSupporter], 570, 'FunnyDogs.com pro committers earn 0.3 * committed');

    const fakeFunnyDogsOpposerScore = await truth.getPoints({ from: fakeFunnyDogsOpposer });
    assert.equal(fakeFunnyDogsOpposerScore - beforeTruths[fakeFunnyDogsOpposer], 330, 'FakeFunnyDogs.com anti committers get 0.3 * committed');

    const smellyDogsScore = await truth.getPoints({ from: smellyDogsSupporter });
    assert.equal(smellyDogsScore - beforeTruths[smellyDogsSupporter], 570, 'SmellyDogs.com pro committers earn 0.3 * committed');

    const maybeSmellyDogsScore = await truth.getPoints({ from: maybeSmellyDogsSupporter });
    return assert.equal(maybeSmellyDogsScore - beforeTruths[maybeSmellyDogsSupporter], 0, 'MaybeSmellyDogs.com pro committers earn 0.3 * committed');

    //// Score is 1900 * 0.75 to 1900 * 0.25, so pro Argument supporters win
  });
});
