import React from "react";
import { Link } from "react-router-dom";
import ModeratorStatus from "./ModeratorStatus.js";
import ActiveArguments from "./ActiveArguments.js";
import NewArgument from "./NewArgument";

const Home = ({ needsInit, initAccount, truthPoints, address, truthContract, argumentsContract }) => {
  return <div>
    { needsInit ?
      <div className="welcome">
        <h1>Debate on the internet is broken.</h1>
        <br />
        <p>Socratiq is the first community that <b>rewards members</b> for making <b>nuanced</b>, <b>thoughtful</b>, <b>research-backed</b> arguments.</p>
        <br />
        <p>It costs 0.2 ETH to join (<Link to="/why">why?</Link>)</p>
        <br />
        <button type="button" className="btn btn-lg" onClick={initAccount}>Join with MetaMask Wallet</button>
      </div>
      :
      <div>
        <ActiveArguments argumentsContract={argumentsContract} />
        <p>Your Truth Points: {truthPoints}</p>
        <ModeratorStatus address={address} truthContract={truthContract} argumentsContract={argumentsContract} />

        <NewArgument address={address} argumentsContract={argumentsContract} />
      </div>
    }
  </div>
}

export default Home