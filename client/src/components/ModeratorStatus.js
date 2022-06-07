import React, { useEffect, useState } from "react";

import ArgumentsInReview from "./ArgumentsInReview.js";

const ModeratorStatus = ({ address, truthContract, argumentsContract }) => {
  const [isModerator, setIsModerator] = useState(null)
  useEffect(async () => {
    setIsModerator(await truthContract.methods.isModerator(address).call());
  }, [])
  if (isModerator === null) return <p>loading moderator status</p>;
  if (isModerator) return <div>
    <p>whoa you're a moderator</p>
    <ArgumentsInReview argumentsContract={argumentsContract} />
  </div>;
  return <p>you are just a normie</p>;
}

export default ModeratorStatus;
