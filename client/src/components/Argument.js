import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { ARGUMENT_STATUSES, STATUS_ICONS } from "../Constants.js";
import NewFactModal from "./NewFactModal.js";

import { classNames } from "../Utils.js"

const BUTTON_CLASS = 'cursor-pointer py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'

const Source = ({ address, sourcesContract, id }) => {
  const [text, setText] = useState(null);
  const [supportingTruth, setSupportingTruth] = useState(null);
  const [opposingTruth, setOpposingTruth] = useState(null);
  
  const retrieveArgument = async () => {
    const details = await sourcesContract.methods.getDetails(id).call({ from: address });
    setText(details[0]);
    setSupportingTruth(details[1]);
    setOpposingTruth(details[2]);
  }

  useEffect(() => {
    retrieveArgument();
  }, []);

  if (!text) return <p>loading...</p>
  return <div>
    <p>{text} { supportingTruth } {opposingTruth }</p>
  </div>
}

const NoFactsYet = ({ position }) => {
  return <div className="border-dotted border-2 border-slate-500 p-5 mr-5 text-center">
    <p>No {position} Facts submitted yet.</p>
  </div>
}

const Fact = ({ details: { text, inSupport, relevanceScore }, address, factsContract, sourcesContract, id }) => {
  const [sourceIds, setSourceIds] = useState(null);
  
  const retrieveSourceIds = async () => {
    const ids = await sourcesContract.methods.forFact(id).call({ from: address });
    console.log(ids);
    setSourceIds(ids);
  }
  useEffect(() => {
    retrieveSourceIds();
  }, []);

  // {sourceIds && <div>
  //   {sourceIds.map(sourceId => <Source id={sourceId} address={address} sourcesContract={sourcesContract} />)}
  // </div>}


  return <div className={classNames(inSupport ? 'border-cyan-700 mr-5' : 'border-orange-700 ml-5', 'border-dotted hover:border-solid cursor-pointer border-2 p-5 mb-5')}>
    <p>{text}</p>
    <div className="flex flex-row justify-between mt-5">
      <p><b>{relevanceScore}%</b> Relevance</p>
      {sourceIds && <p><b>{sourceIds.length}</b> Sources</p>}
    </div>
  </div>
}

const Argument = ({ address, truthContract, argumentsContract, factsContract, sourcesContract }) => {
  const [text, setText] = useState(null);
  const [status, setStatus] = useState(null);
  const [creator, setCreator] = useState(null);
  const [factIds, setFactIds] = useState(null);
  const [factDetails, setFactDetails] = useState({});
  const [isModerator, setIsModerator] = useState(null)
  const [showingNewFactModal, setShowingNewFactModal] = useState(false)

  const params = useParams();

  const argId = params.argId

  const retrieveDetails = async () => {
    const details = await argumentsContract.methods.getDetails(argId).call({ from: address });
    setText(details[0]);
    setStatus(ARGUMENT_STATUSES[parseInt(details[1])]);
    setCreator(details[2]);
  }

  const retrieveFactIds = async () => {
    const ids = await factsContract.methods.forArgument(argId).call({ from: address });
    setFactIds(ids);
  }
  
  useEffect(() => {
    retrieveDetails();
    retrieveFactIds();
  }, []);

  const retrieveFact = async (factId) => {
    const details = await factsContract.methods.getDetails(factId).call({ from: address });
    setFactDetails(existingFactDetails => {
      return {
        ...existingFactDetails,
        [factId]: {
          text: details[0],
          inSupport: details[1],
          relevanceScore: parseInt(details[2])
        }
      }
    })
  }

  useEffect(() => {
    if (factIds) factIds.forEach(retrieveFact)
  }, [factIds])

  const retrieveModeratorStatus = async () => {
    const newModeratorStatus = await truthContract.methods.isModerator(address).call();
    setIsModerator(newModeratorStatus);
  }
  
  useEffect(() => {
    if (address) retrieveModeratorStatus();
  }, [address]);

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
    if (!isModerator) return null
    return {
      'NEEDS_REVIEW': <button type="button" className={BUTTON_CLASS} onClick={approve}>Mark as Approved</button>,
      'BETTING':      <button type="button" className={BUTTON_CLASS} onClick={startDebating}>Start Debating</button>,
      'DEBATING':     <button type="button" className={BUTTON_CLASS} onClick={scoreArgument}>End Debate</button>,
    }[status] || null
  }

  const filteredFacts = (inSupport) => {
    return Object.keys(factDetails).filter(id => factDetails[id].inSupport === inSupport).map(id => {
      return <Fact key={id} id={id} details={factDetails[id]} factsContract={factsContract} sourcesContract={sourcesContract} address={address} />
    })
  }

  const factsSupporting = filteredFacts(true);
  const factsOpposing = filteredFacts(false);

  return <div className="max-w-7xl mx-auto px-2 mt-8 sm:px-6 lg:px-8">
    <NewFactModal
      open={showingNewFactModal}
      setOpen={setShowingNewFactModal}
      address={address}
      factsContract={factsContract}
      argumentId={argId}
      argumentText={text}
    />
    <div className="flex flex-row justify-between items-center my-5">
      <div className="flex flex-col">
        <div>{STATUS_ICONS[status]}</div>
        <p className="text-xs">{status ? status.replace(/_/g, ' ') : 'Loading...'}</p>
      </div>
      <div className="flex flex-row w-3/4 h-12">
        <div className="bg-cyan-700 rounded-l-sm flex flex-col justify-center" style={{width: '90%'}}>
          <p className="truncate mx-2 text-center text-white">1.2 ETH Supporting</p>
        </div>
        <div className="bg-orange-700 rounded-r-sm flex flex-col justify-center" style={{ width: '10%' }}>
          <p className="truncate mx-2 text-center text-white">0.2 ETH Opposing</p>
        </div>
      </div>
      { moderatorButtons() }
    </div>
    <h1 className="text-3xl font-bold my-10">{text}</h1>
    <div className="flex flex-row justify-between my-5">
      <h2 className="w-1/2 text-2xl">Facts <span className="text-cyan-700">Supporting</span></h2>
      <h2 className="w-1/2 text-right text-2xl">Facts <span className="text-orange-700">Opposing</span></h2>
    </div>
    <div className="flex flex-row mb-10">
      <div className="flex flex-col w-1/2">
        { factsSupporting.length > 0 ? factsSupporting : <NoFactsYet position={'Supporting'} /> }
      </div>
      <div className="flex flex-col w-1/2">
        { factsOpposing.length > 0 ? factsOpposing : <NoFactsYet position={'Opposing'} />}
      </div>
    </div>
    <div className="flex flex-col w-1/4 mx-auto mb-8">
      <button type="button" className={BUTTON_CLASS} onClick={() => setShowingNewFactModal(true)}>Submit a <b>Relevant</b> Fact</button>
    </div>
  </div>;
}

export default Argument;
