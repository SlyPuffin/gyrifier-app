import React from 'react'
import { Navbar } from '@/utils/navbar'

export default function NavbarWrapper( { children } ) {
  return (
    <>
    <div className='border-4 border-skin-wowred'></div>
        <Navbar />
        {children}
    </>
  )
}
