import React from "react";
import { EmojiSadIcon } from '@heroicons/react/outline'

const SADS = [
  'Bummer', 'Rats', 'Lame', 'Whack', 'Huh', 'WTF', 'ngmi'
]
const EmptyState = ({ message }) => (
  <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
      <div>
        <EmojiSadIcon className="mx-auto h-12 w-auto" />
        <h2 className="mt-6 mb-2 text-center text-3xl font-extrabold text-slate-500 dark:text-slate-200">{SADS[Math.floor(Math.random() * SADS.length)]}.</h2>
        <p className="text-center text-lg">{message}</p>
      </div>
    </div>
  </div>
)

export default EmptyState