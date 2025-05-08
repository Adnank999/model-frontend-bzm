import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl font-bold">
              AI{" "}
              <span className="inline-flex items-center justify-center w-6 h-6 bg-black text-white rounded-full text-sm">
                BG
              </span>
            </h1>
          </Link>
        </div>
      </nav>
  )
}

export default Navbar