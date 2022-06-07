import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const ArgumentsInReview = ({ argumentsContract }) => {
  const [inReviewArgIds, setInReviewArgIds] = useState(null)
  useEffect(async () => {
    setInReviewArgIds(await argumentsContract.methods.requiringReview().call());
  }, [])
  if (inReviewArgIds === null) return <p>loading args</p>;
  return <ul>{inReviewArgIds.map(id => <li key={id}><Link to={`arguments/${id}`}>{id}</Link></li>)}</ul>;

}

export default ArgumentsInReview;
