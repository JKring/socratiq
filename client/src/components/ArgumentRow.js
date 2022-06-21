import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { ARGUMENT_STATUSES, STATUS_ICONS } from "../Constants";

const TD_CLASS = 'border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-200';

const ArgumentRow = ({ address, id, argumentsContract }) => {
  const [text, setText] = useState(null);
  const [status, setStatus] = useState(null);
  const [creator, setCreator] = useState(null);
  const retrieveDetails = async () => {
    const details = await argumentsContract.methods.getDetails(id).call({ from: address });
    setText(details[0]);
    setStatus(ARGUMENT_STATUSES[parseInt(details[1])]);
    setCreator(details[2]);
  }
  
  useEffect(() => {
    retrieveDetails();
  }, []);

  if (status === null || text === null) return <tr />
  return <tr>
    <td className={TD_CLASS}>{STATUS_ICONS[status]}</td>
    <td className={TD_CLASS}>{status.replace(/_/g, ' ')}</td>
    <td className={TD_CLASS}>{creator}</td>
    <td className={TD_CLASS}><Link className="text-indigo-500 font-bold" to={`/arguments/${id}`}>{text}</Link></td>
  </tr>;
}

export default ArgumentRow;
