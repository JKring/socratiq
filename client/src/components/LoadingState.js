import React from "react";
import { ClockIcon } from '@heroicons/react/outline'

const LoadingState = ({ message }) => (
  <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
      <div>
        <ClockIcon className="mx-auto h-12 w-auto" />
        <h2 className="mt-6 mb-2 text-center text-3xl font-extrabold text-slate-500 dark:text-slate-200">{message}...</h2>
      </div>
    </div>
  </div>
)

export default LoadingState