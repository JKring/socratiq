const Arguments = artifacts.require("Arguments");
const Facts = artifacts.require("Facts");
const Sources = artifacts.require("Sources");
const DebateCoin = artifacts.require("DebateCoin");
const Truth = artifacts.require("Truth");

module.exports = function (deployer) {
  deployer.deploy(DebateCoin);
  return deployer.deploy(Arguments).then(function(args) {
    return deployer.deploy(Facts).then(function(facts) {
      return deployer.deploy(Sources).then(function(sources) {
        return deployer.deploy(Truth, Arguments.address, Facts.address, Sources.address).then(function(truth) {
          return args.setTruthAddress(truth.address).then(function() {
            return facts.setTruthAddress(truth.address).then(function() {
              return sources.setTruthAddress(truth.address)            
            })
          })
        })
      });
    });
  });
};
