import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import EmptyState from './EmptyState.js';
import LoadingState from "./LoadingState.js";

const ActiveArguments = ({ argumentsContract }) => {
  const [activeArgIds, setActiveArgIds] = useState(null)
  const retrieveActiveArgs = async () => {
    const ids = await argumentsContract.methods.active().call();
    setActiveArgIds(ids);
  }
  useEffect(() => {
    retrieveActiveArgs();
  }, []);
  if (activeArgIds === null) return <LoadingState message={'Fetching Arguments'} />;
  if (activeArgIds.length === 0) return <EmptyState message={'No Arguments have been submitted today.'} />
  return <table className="table-auto">
    <thead>
      <tr>
        <th>ID</th>
      </tr>
    </thead>
    <tbody>
      {activeArgIds.map(id => <tr key={id}><td><Link to={`/arguments/${id}`}>{id}</Link></td></tr>)}
    </tbody>
  </table>
}

export default ActiveArguments;
