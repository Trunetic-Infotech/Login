import React from 'react'
import { useAuth } from '../context/Auth'

const Homepage = () => {
  const {auth} =useAuth()
  return (
    <div>
       {!auth.user ? (
                <>
                  <li>
                    <div
                      to="/register"
                      className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                     are u ready to start your day ?
                    </div>
                  </li>
                </>
              ) : (
                <>
                   <li>
                <div
                  to="/records-deta"
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Hallo  {auth?.user?.userName || 'N/A'}
                </div>
              </li>
                  
                    <div
                      
                      className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                     I hone your day goes well today
                    </div>
               
                </>
              )}
    </div>
  )
}

export default Homepage

