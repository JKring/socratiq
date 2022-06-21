import React, { useEffect, useState } from "react";

import LoadingState from "./LoadingState.js";
import ArgumentRow from './ArgumentRow.js';

const TH_CLASS = 'border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left';

const ArgumentsInReview = ({ address, argumentsContract }) => {
  const [inReviewArgIds, setInReviewArgIds] = useState(null)
  const retrieveArgsInReview = async () => {
    const ids = await argumentsContract.methods.requiringReview().call();
    setInReviewArgIds(ids);
  }
  useEffect(() => {
    retrieveArgsInReview();
  }, []);
  if (inReviewArgIds === null) return <LoadingState message={'Fetching Arguments'} />;
  return <div className="max-w-7xl mx-auto px-2 mt-8 sm:px-6 lg:px-8">
    <h1 className="text-xl font-bold my-3">Arguments Awaiting Review</h1>
    <table className="border-collapse w-full border border-slate-400 dark:border-slate-500 bg-white dark:bg-slate-800 text-sm shadow-sm">
      <thead className="bg-slate-50 dark:bg-slate-700">
        <tr>
          <th className={TH_CLASS} />
          <th className={TH_CLASS}>Status</th>
          <th className={TH_CLASS}>Argument</th>
        </tr>
      </thead>
      <tbody>
        {inReviewArgIds.map(id => <ArgumentRow key={id} id={id} address={address} argumentsContract={argumentsContract} />)}
      </tbody>
    </table>
  </div>
}

export default ArgumentsInReview;
