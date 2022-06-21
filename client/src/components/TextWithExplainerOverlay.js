import { Fragment, useState } from 'react'
import { Transition } from '@headlessui/react'

const TextWithExplainerOverlay = ({ text, explainer }) => {
  const [showing, setShowing] = useState(false)
  const toggleShowing = () => setShowing(!showing)
  return <>
    <span
      className="underline decoration-dotted text-indigo-500"
      onMouseEnter={() => setShowing(true)}
      onMouseLeave={() => setShowing(false)}
      onClick={toggleShowing}>
        {text}
    </span>
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
      show={showing}
    >
      <div className="absolute shadow-lg bg-white rounded-md max-w-lg border-solid border-2 border-indigo-500 p-5">
        {explainer}
      </div>
    </Transition>
  </>
}

export default TextWithExplainerOverlay