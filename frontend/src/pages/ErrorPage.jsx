import React from 'react'
import { Link } from 'react-router-dom'

function ErrorPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
    <div className="max-w-lg text-center">
      <h1 className="text-4xl font-bold text-gray-800">404 - Page Not Found</h1>
      <p className="text-gray-600 mt-4">Oops! The page you are looking for could not be found.</p>
      <p className="text-gray-600">Please check the URL in the address bar and try again.</p>
      <img src="/404.svg" alt="404 Illustration" className="mt-8 w-full max-w-xs mx-auto" />
      <Link to="/" className="mt-8 inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 ease-in-out">
        Go Home 
      </Link>
      
    </div>
  </div>

  )
}

export default ErrorPage