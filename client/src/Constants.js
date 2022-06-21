import { ClockIcon, XIcon, CurrencyDollarIcon, ScaleIcon, CheckCircleIcon } from '@heroicons/react/outline'

export const ARGUMENT_STATUSES = [
  'NEEDS_REVIEW', 'REJECTED', 'BETTING', 'DEBATING', 'FINISHED'
];

export const STATUS_ICONS = {
  // TODO - Move className out of here.
  NEEDS_REVIEW: <ClockIcon className="mx-auto h-8 w-auto" />,
  REJECTED: <XIcon className="mx-auto h-8 w-auto" />,
  BETTING: <CurrencyDollarIcon className="mx-auto h-8 w-auto"  />,
  DEBATING: <ScaleIcon className="mx-auto h-8 w-auto"  />,
  FINISHED: <CheckCircleIcon className="mx-auto h-8 w-auto" />
}

export const MAX_SUBMISSION_LENGTH = 280;