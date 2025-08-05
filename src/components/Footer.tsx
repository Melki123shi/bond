import React from 'react'

const Footer = () => {
  return (
    <div className="py-8 mt-8">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer