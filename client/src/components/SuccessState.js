import React from "react";
import { EmojiHappyIcon } from '@heroicons/react/outline'

const HAPPIES = [
  'Yay', 'Well Done', 'W00T', 'wagmi', 'Awesome', 'Heck Yea', 'Niceeee'
]
const SuccessState = ({ message, nextStep }) => (
  <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
      <div>
        <EmojiHappyIcon className="mx-auto h-12 w-auto" />
        <h2 className="mt-6 mb-2 text-center text-3xl font-extrabold text-slate-500 dark:text-slate-200">{HAPPIES[Math.floor(Math.random() * HAPPIES.length)]}.</h2>
        <p className="text-center text-lg">{message}</p>
        { nextStep }
      </div>
    </div>
  </div>
)

export default SuccessState