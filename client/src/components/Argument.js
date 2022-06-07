import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const STATUSES = [
  'NEEDS_REVIEW', 'REJECTED', 'BETTING', 'DEBATING', 'FINISHED'
];

const Source = ({ address, sourcesContract, id }) => {
  const [text, setText] = useState(null);
  const [supportingTruth, setSupportingTruth] = useState(null);
  const [opposingTruth, setOpposingTruth] = useState(null);
  
  useEffect(async () => {
    const details = await sourcesContract.methods.getDetails(id).call({ from: address });
    setText(details[0]);
    setSupportingTruth(details[1]);
    setOpposingTruth(details[2]);
  }, []);

  if (!text) return <p>loading...</p>
  return <div>
    <p>{text} { supportingTruth } {opposingTruth }</p>
  </div>
}

const Fact = ({ address, factsContract, sourcesContract, id }) => {
  const [text, setText] = useState(null);
  const [inSupport, setInSupport] = useState(null);
  const [relevanceScore, setRelevanceScore] = useState(null);
  const [sourceIds, setSourceIds] = useState(null);
  
  useEffect(async () => {
    const details = await factsContract.methods.getDetails(id).call({ from: address });
    setText(details[0]);
    setInSupport(details[1]);
    setRelevanceScore(details[2]);
  }, []);

  useEffect(async () => {
    setSourceIds(await sourcesContract.methods.forFact(id).call({ from: address }));
  }, []);
  if (!text) return <p>loading...</p>
  return <div>
    <p>{text} { inSupport } {relevanceScore }</p>
    {sourceIds && <div>
      {sourceIds.map(sourceId => <Source id={sourceId} address={address} sourcesContract={sourcesContract} />)}
    </div>}
  </div>
}

const NewFact = ({ address, factsContract, argumentId }) => {
  const [text, setText] = useState('');
  const [position, setPosition] = useState(null);
  const submitFact = async (event) => {
    event.preventDefault();
    if (!position) {
      alert('You must pick a position');
    } else if (text === '') {
      alert('You must enter some text');
    } else {
      const result = await factsContract.methods.create(argumentId, text, position === 'supporting').send({ from: address });
      console.log(`https://etherscan.io/tx/${result.transactionHash}`);
      setText('');
    }
  } 
  const onChangePosition = (event) => {
    setPosition(event.target.value);
  }
  return <div>
    <form onSubmit={submitFact}>
      <textarea value={text} onChange={(event) => setText(event.target.value)} />
      <br />
      <div onChange={onChangePosition}>
        <input type="radio" value="supporting" name="position" /> In Support
        <input type="radio" value="opposing" name="position" /> Opposing
      </div>
      <input type="submit" value="Submit" />
    </form>
  </div>;
}

const Argument = ({ address, truthContract, argumentsContract, factsContract, sourcesContract }) => {
  const [text, setText] = useState(null);
  const [status, setStatus] = useState(null);
  const [factIds, setFactIds] = useState(null);
  const params = useParams();

  const argId = params.argId
  
  useEffect(async () => {
    const details = await argumentsContract.methods.getDetails(argId).call({ from: address });
    setText(details[0]);
    setStatus(STATUSES[parseInt(details[1])]);
  }, []);

  useEffect(async () => {
    setFactIds(await factsContract.methods.forArgument(argId).call({ from: address }));
  }, []);

  const approve = async () => {
    await argumentsContract.methods.approve(argId).send({ from: address });
    setStatus('BETTING');
  }
  
  const startDebating = async () => {
    await argumentsContract.methods.startDebating(argId).send({ from: address });
    setStatus('DEBATING');
  }

  const scoreArgument = async () => {
    await truthContract.methods.scoreArgument(argId).send({ from: address });
    setStatus('FINISHED');
  }

  const moderatorButtons = () => {
    return {
      'NEEDS_REVIEW': <a href='#' onClick={approve}>mark as approved</a>,
      'BETTING':      <a href='#' onClick={startDebating}>start debating</a>,
      'DEBATING':     <a href='#' onClick={scoreArgument}>end debate</a>,
    }[status] || null
  }
  return <div>
    <h1>{status}: {text}</h1>
    { moderatorButtons() }
    {factIds && <div>{factIds.map(factId => <Fact key={factId} id={factId} factsContract={factsContract} sourcesContract={sourcesContract} address={address} />)}</div> }
    <NewFact address={address} factsContract={factsContract} argumentId={argId} />
  </div>;
}

export default Argument;
