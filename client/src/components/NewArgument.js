import React, { useState } from "react";
import SuccessState from "./SuccessState";

import { MAX_SUBMISSION_LENGTH } from "../Constants";

const EXAMPLE_ARGUMENTS = [
  'The current bout of inflation was not caused by rampant monetary supply.',
  'Assault Rifles should not be banned in the US.',
  'DeFi needs to be regulated.'
];

const NewArgument = ({ address, argumentsContract }) => {
  const [text, setText] = useState('');
  const [transactionHash, setTransactionHash] = useState(null);
  const submitArgument = async (event) => {
    event.preventDefault();
    if (text.length <= MAX_SUBMISSION_LENGTH) {
      const result = await argumentsContract.methods.create(text).send({ from: address });
      setTransactionHash(result.transactionHash);
      setText('')
    }
  }
  if (transactionHash) return <SuccessState
    message={"Socratiq Moderators will review your Argument ASAP."}
    nextStep={
      <p className="text-center text-sm mt-2">Into nerdy stuff? Check out the <a 
        target="_blank"
        className="text-indigo-600 font-bold"
        href={`https://etherscan.io/tx/${transactionHash}`}>
          transaction here
        </a>.
      </p>
    }
  />
  let lengthWarningColor = 'text-slate-500 dark:text-slate-200'
  if (text.length > MAX_SUBMISSION_LENGTH * 0.65) lengthWarningColor = 'text-yellow-500'
  if (text.length > MAX_SUBMISSION_LENGTH * 0.75) lengthWarningColor = 'text-orange-500'
  if (text.length > MAX_SUBMISSION_LENGTH * 0.9)  lengthWarningColor = 'text-red-500'
  return <div className="max-w-lg mt-5 pt-5 mx-auto">
    <form onSubmit={submitArgument}>
      <label htmlFor="about" className="block text-3xl font-medium text-slate-700 dark:text-slate-200">
        Your <b>Thoughtful</b> Argument
      </label>
      <div className="my-3">
        <textarea
          className="shadow-sm text-slate-700 focus:ring-indigo-500 focus:border-indigo-500 mt-1 p-2 block w-full sm:text-sm border border-gray-300 rounded-md"
          name="argument"
          value={text}
          onChange={(event) => {
            if (event.target.value.length <= MAX_SUBMISSION_LENGTH) setText(event.target.value)
          }}
          rows={3} />
      </div>
      <div className="flex flex-row justify-between">
        <p className="text-md text-slate-500 dark:text-slate-200">
          Examples of <b>Thoughtful</b> Arguments:
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-200">
          <span className={lengthWarningColor}>{text.length}</span> / {MAX_SUBMISSION_LENGTH}
        </p>
      </div>
      <ul className="list-disc list-inside text-sm text-slate-500 dark:text-slate-200 mt-2">
        {EXAMPLE_ARGUMENTS.map(arg => <li>{arg}</li>)}
      </ul>
      <div className="flex flex-row-reverse">
        <input
          className="cursor-pointer mt-4 py-2 px-4 border border-transparent shadow-sm text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          type="submit"
          value="Submit for Review" />
      </div>
    </form>
  </div>;
}

export default NewArgument;
