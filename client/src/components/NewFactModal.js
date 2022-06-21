import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { BookOpenIcon } from '@heroicons/react/outline'

import { MAX_SUBMISSION_LENGTH } from "../Constants";

import SuccessState from './SuccessState';

const NewFactModal = ({ open, setOpen, address, factsContract, argumentId, argumentText }) => {
  const [text, setText] = useState('');
  const [position, setPosition] = useState('supporting');
  const [transactionHash, setTransactionHash] = useState(null)
  const submitFact = async (event) => {
    event.preventDefault();
    if (!position) {
      alert('You must pick a position');
    } else if (text === '') {
      alert('You must enter some text');
    } else {
      const result = await factsContract.methods.create(argumentId, text, position === 'supporting').send({ from: address });
      setText('');
      setTransactionHash(result.transactionHash)
    }
  } 
  const onChangePosition = (event) => {
    setPosition(event.target.value);
  }
  const textAreaRef = useRef(null)

  let lengthWarningColor = 'text-slate-500'
  if (text.length > MAX_SUBMISSION_LENGTH * 0.65) lengthWarningColor = 'text-yellow-500'
  if (text.length > MAX_SUBMISSION_LENGTH * 0.75) lengthWarningColor = 'text-orange-500'
  if (text.length > MAX_SUBMISSION_LENGTH * 0.9)  lengthWarningColor = 'text-red-500'

  const clearState = () => {
    if (transactionHash) {
      setText('')
      setTransactionHash(null)
      setPosition('supporting')
    }
    setOpen(false)
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={textAreaRef} onClose={clearState}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                { transactionHash ? 
                  <>
                    <SuccessState
                      message={"Your Fact will be live soon!"}
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
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                      <button
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={clearState}
                      >
                        Got it!
                      </button>
                    </div>
                  </>
                :
                  <form onSubmit={submitFact}>
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                          <BookOpenIcon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                        </div>
                        <div className="grow mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                            Submit a <b>Relevant</b> Fact
                          </Dialog.Title>
                          <div className="mt-2">
                            <textarea
                              className="shadow-sm text-slate-700 focus:ring-indigo-500 focus:border-indigo-500 mt-1 p-2 block w-full sm:text-sm border border-gray-300 rounded-md"
                              name="fact"
                              ref={textAreaRef}
                              value={text}
                              onChange={(event) => {
                                if (event.target.value.length <= MAX_SUBMISSION_LENGTH) setText(event.target.value)
                              }}
                              rows={3} />
                            <p className="text-sm text-right text-slate-500">
                              <span className={lengthWarningColor}>{text.length}</span> / {MAX_SUBMISSION_LENGTH}
                            </p>
                            <fieldset>
                              <legend className="text-slate-700">Does this Fact Support or Oppose the Argument?</legend>
                              <legend className="text-sm text-slate-700 mt-2">{ argumentText }</legend>
                              <div className="flex flex-row mt-4 space-x-4 justify-center sm:justify-start">
                                <div className="flex items-center">
                                  <input
                                    id="supporting"
                                    value="supporting"
                                    name="position"
                                    type="radio"
                                    onChange={onChangePosition}
                                    checked={position === 'supporting'}
                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 cursor-pointer"
                                  />
                                  <label htmlFor="supporting" className="ml-2 block text-sm font-medium text-gray-700 cursor-pointer">
                                    Support
                                  </label>
                                </div>
                                <div className="flex items-center">
                                  <input
                                    id="opposing"
                                    value="opposing"
                                    name="position"
                                    type="radio"
                                    onChange={onChangePosition}
                                    checked={position === 'opposing'}
                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 cursor-pointer"
                                  />
                                  <label htmlFor="opposing" className="ml-2 block text-sm font-medium text-gray-700 cursor-pointer">
                                    Oppose
                                  </label>
                                </div>
                              </div>
                            </fieldset>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                      <input
                        type="submit"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                        value="Submit"
                      />
                      <button
                        type="button"
                        className="cursor-pointer mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => setOpen(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                }
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default NewFactModal