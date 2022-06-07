import React, { useEffect, useState } from "react";

const ActiveArguments = ({ argumentsContract }) => {
  const [activeArgIds, setActiveArgIds] = useState(null)
  useEffect(async () => {
    setActiveArgIds(await argumentsContract.methods.active().call());
  }, [])
  if (activeArgIds === null) return <p>loading args</p>;
  return <ul>{activeArgIds.map(id => <li key={id}><a href={`arguments/${id}`}>{id}</a></li>)}</ul>;
}

export default ActiveArguments;
