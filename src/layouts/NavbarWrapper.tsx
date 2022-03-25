import React from 'react'
import { Navbar } from '@/utils/navbar'

export default function NavbarWrapper( { children } ) {
  return (
    <>
    <div className='border-4 theme-2 border-regal-blue'></div>
        <Navbar />
        {children}
    </>
  )
}
