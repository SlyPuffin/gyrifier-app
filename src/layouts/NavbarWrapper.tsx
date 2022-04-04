import React from 'react'
import { Navbar } from '@/utils/navbar'

export default function NavbarWrapper( { children } ) {
  return (
    <>
    <div className='border-4 easter border-skin-muted'></div>
        <Navbar />
        {children}
    </>
  )
}
