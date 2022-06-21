import React, { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';

import { Disclosure } from '@headlessui/react'
import { MenuIcon, ScaleIcon, XIcon } from '@heroicons/react/outline'

import { classNames } from "../Utils";

const Navigation = ({ truthPoints,  address, truthContract }) => {
  const [isModerator, setIsModerator] = useState(null)
  const retrieveModeratorStatus = async () => {
    const newModeratorStatus = await truthContract.methods.isModerator(address).call();
    setIsModerator(newModeratorStatus);
  }
  useEffect(() => {
    if (address) retrieveModeratorStatus();
  }, [address]);

  const location = useLocation();

  const navigationTabs = () => {
    let tabs = [
      { name: "Today's Arguments", href: '/' },
      { name: "How's it Work?", href: '/white-paper' },
    ]
    if (isModerator) {
      tabs.push({ name: 'Moderator Tasks', href: '/arguments-in-review' })
    }
    return tabs
  }

  return <Disclosure as="nav" className="bg-gray-800">
    {({ open }) => (
      <>
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <XIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                )}
              </Disclosure.Button>
            </div>
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center">
                <img
                  className="block lg:hidden h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                  alt="Workflow"
                />
                <img
                  className="hidden lg:block h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                  alt="Workflow"
                />
              </div>
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  {navigationTabs().map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        location.pathname === item.href ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'px-3 py-2 rounded-md text-sm font-medium'
                      )}
                      aria-current={location.pathname === item.href ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <Link to={'/veracity-points'}
                type="button"
                className="flex-row bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                <ScaleIcon className="h-7 w-7 inline" aria-hidden="true" />
                <p className="inline mx-1">{ truthPoints / 100.0 } Veracity<span className="hidden sm:inline"> Points</span></p>
              </Link>
            </div>
          </div>
        </div>

        <Disclosure.Panel className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigationTabs().map((item) => (
              <Disclosure.Button
                key={item.name}
                as={Link}
                to={item.href}
                className={classNames(
                  location.pathname === item.href ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'block px-3 py-2 rounded-md text-base font-medium'
                )}
                aria-current={location.pathname === item.href ? 'page' : undefined}
              >
                {item.name}
              </Disclosure.Button>
            ))}
          </div>
        </Disclosure.Panel>
      </>
    )}
  </Disclosure>
};

export default Navigation