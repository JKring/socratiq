import React, { Component } from "react";
import {
  Routes,
  Route,
} from "react-router-dom";

import TruthContract from "./contracts/Truth.json";
import ArgumentsContract from "./contracts/Arguments.json";
import FactsContract from "./contracts/Facts.json";
import SourcesContract from "./contracts/Sources.json";
import getWeb3 from "./getWeb3";

import JustATestNet from './components/JustATestNet.js'
import Navigation from './components/Navigation.js'
import LoadingState from "./components/LoadingState";
import Home from './components/Home.js'
import WhitePaper from "./components/WhitePaper";
import VeracityPoints from "./components/VeracityPoints";
import ActiveArguments from "./components/ActiveArguments.js";
import ArgumentsInReview from "./components/ArgumentsInReview.js";
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
    factsContract: null,
    sourcesContract: null,
    walletError: null
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
      if (deployedTruth) {
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
      } else {
        this.setState({ walletError: 'wrongNetwork', needsInit: true })
      }
    } catch (error) {
      this.setState({ walletError: 'noWallet', needsInit: true })
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

  renderApp = () => {
    const {
      web3, needsInit, initUnderway,
      accounts,
      truthContract, argumentsContract,
      factsContract, sourcesContract,
      walletError
    } = this.state
    const address = accounts ? accounts[0] : null
    if (!web3 && !walletError) {
      return <LoadingState message={'Loading Truth'} />;
    }
    if (initUnderway) {
      return <LoadingState message={'Setting up your account'} />;
    }
    return <Routes>
      <Route path="/" element={
        <Home 
          needsInit={needsInit}
          walletError={walletError}
          initAccount={this.initAccount}
          address={address}
          truthContract={truthContract}
          argumentsContract={argumentsContract}/>
        } 
      />
      <Route path="/arguments-in-review" element={<ArgumentsInReview address={address} argumentsContract={argumentsContract} />} />
      <Route path="/arguments" element={<ActiveArguments argumentsContract={argumentsContract} />} />
      <Route path="/arguments/:argId"
        element={
        <Argument address={address}
          argumentsContract={argumentsContract}
          truthContract={truthContract}
          factsContract={factsContract}
          sourcesContract={sourcesContract} />
        } 
      />
      <Route path="/arguments/new" element={<NewArgument address={address} argumentsContract={argumentsContract} />} />
      <Route path="/white-paper" element={<WhitePaper />} />
      <Route path="/veracity-points" element={<VeracityPoints />} />
    </Routes>
  }

  render() {
    const {
      truthPoints, accounts,
      truthContract, argumentsContract
    } = this.state
    const address = accounts ? accounts[0] : null
    return (
      <div className="text-slate-500 dark:text-slate-200 bg-white dark:bg-slate-900 min-h-screen">
        <JustATestNet />
        <Navigation address={address} truthPoints={truthPoints} truthContract={truthContract} argumentsContract={argumentsContract} />
        { this.renderApp() }
      </div>
    );
  }
}

export default App;
