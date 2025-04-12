import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div className='bg-gray-100 font-sans leading-normal tracking-normal'>
    

<div class="flex items-center justify-center min-h-screen">
  <div class="text-center bg-white p-10 rounded-lg shadow-xl">
    <h1 class="text-6xl font-bold text-red-600">404</h1>
    <p class="mt-4 text-xl text-gray-700">Oops! The page you are looking for could not be found.</p>
    <Link to="/login" class="mt-6 inline-block bg-blue-500 text-white py-3 px-6 rounded-md text-lg font-semibold transition duration-300 hover:bg-blue-600">
      Back to Login
    </Link>
  </div>
</div>
    </div>
  )
}

export default PageNotFound
