import React, { Component } from "react";
import {
  Routes,
  Route,
  Link
} from "react-router-dom";

import TruthContract from "./contracts/Truth.json";
import ArgumentsContract from "./contracts/Arguments.json";
import FactsContract from "./contracts/Facts.json";
import SourcesContract from "./contracts/Sources.json";
import getWeb3 from "./getWeb3";

import "./App.css";

import Home from './components/Home.js'
import Why from './components/Why.js'
import ActiveArguments from "./components/ActiveArguments.js";
import Argument from "./components/Argument.js";
import NewArgument from "./components/NewArgument";

class App extends Component {
  state = {
    truthPoints: 0,
    needsInit: false,
    initUnderway: false,
    web3: null,
    accounts: null,
    truthContract: null,
    argumentsContract: null,
    factscontract: null,
    sourcescontractcontract: null
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instances.
      const networkId = await web3.eth.net.getId();
      const deployedTruth = TruthContract.networks[networkId];
      const truthContract = new web3.eth.Contract(TruthContract.abi, deployedTruth && deployedTruth.address);
      const deployedArguments = ArgumentsContract.networks[networkId];
      const argumentsContract = new web3.eth.Contract(ArgumentsContract.abi, deployedArguments && deployedArguments.address);
      const deployedFacts = FactsContract.networks[networkId];
      const factsContract = new web3.eth.Contract(FactsContract.abi, deployedFacts && deployedFacts.address);
      const deployedSources = SourcesContract.networks[networkId];
      const sourcesContract = new web3.eth.Contract(SourcesContract.abi, deployedSources && deployedSources.address);

      this.setState({
        web3, accounts, truthContract, argumentsContract, factsContract, sourcesContract
      }, this.promptInitIfNecessary);
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  promptInitIfNecessary = async () => {
    const { accounts, truthContract } = this.state;
    const truthPointsString = await truthContract.methods.getPoints().call({ from: accounts[0] });
    const truthPoints = parseInt(truthPointsString);
    if (truthPoints === 0) {
      this.setState({ needsInit: true })
    } else {
      this.setState({ truthPoints });
    }
  };

  initAccount = async () => {
    const { accounts, truthContract } = this.state;
    await truthContract.methods.initAccount().send({ from: accounts[0] });
    this.setState({ needsInit: false, initUnderway: true })
  }

  render() {
    const {
      web3, needsInit, initUnderway,
      truthPoints, accounts,
      truthContract, argumentsContract, factsContract, sourcesContract
    } = this.state
    if (!web3) {
      return <div>Loading Truth...</div>;
    }
    if (initUnderway) {
      return <div>Setting up your account</div>;
    }
    return (
        <div className="app">
          <nav className="nav">
            <Link to="/" className="brand">
              <img width="58" src="socrates.png" /> &nbsp; Socratiq
            </Link>
          </nav>
          <Routes>
            <Route path="/" element={
              <Home 
                needsInit={needsInit}
                initAccount={this.initAccount}
                truthPoints={truthPoints}
                address={accounts[0]}
                truthContract={truthContract}
                argumentsContract={argumentsContract}/>
              } 
            />
            <Route path="/arguments" element={<ActiveArguments argumentsContract={argumentsContract} />} />
            <Route path="/arguments/:argId"
              element={
              <Argument address={accounts[0]}
                argumentsContract={argumentsContract}
                truthContract={truthContract}
                factsContract={factsContract}
                sourcesContract={sourcesContract} />
              } 
            />
            <Route path="/arguments/new" element={<NewArgument address={accounts[0]} argumentsContract={argumentsContract} />} />
            <Route path="/why" element={<Why />} />
          </Routes>
        </div>
    );
  }
}

export default App;
