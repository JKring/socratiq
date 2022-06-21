import React from "react";
import { Link } from "react-router-dom";
import ActiveArguments from "./ActiveArguments.js";

const WALLET_ERROR_MESSAGES = {
  noWallet: <p>Socratiq is built on web3. So you will need a wallet like Metamask or Rainbow to join.</p>,
  wrongNetwork: <p>Socratiq runs on Polygon, so you'll need to connect to the Polygon chain in your Wallet.</p>
}

const Home = ({ needsInit, walletError, initAccount, argumentsContract }) => {
  return <div>
    { needsInit ?
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg w-full text-center">
          <h1  className="text-3xl font-bold my-10">Debate on the internet is broken.</h1>
          <p className="text-lg">Socratiq is the first community that <b>rewards members</b> for making <b>nuanced</b>, <b>thoughtful</b>, <b>research-backed</b> arguments.</p>
          { walletError ?
            <div className="bg-orange-100 p-5 rounded-lg mt-8">{WALLET_ERROR_MESSAGES[walletError]}</div>
            :
            <button
              type="button"
              className="cursor-pointer my-10 py-2 px-4 border border-transparent shadow-sm text-xl font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
              onClick={initAccount}>
              Join with MetaMask Wallet
            </button>
          }
        </div>
      </div>
      :
      <div>
        <ActiveArguments argumentsContract={argumentsContract} />

        <div className="flex items-center justify-center">
          <Link
            to={'/arguments/new'}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Start a New Argument
          </Link>
        </div>
      </div>
    }
  </div>
}

export default Home