import React from 'react'
import { Navbar } from '@/utils/navbar'

export default function NavbarWrapper( { children } ) {
  return (
    <>
        <Navbar />
        {children}
    </>
  )
}
