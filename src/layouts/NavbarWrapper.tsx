import React, { useState } from 'react'
import { Navbar } from '@/utils/navbar'


export default function NavbarWrapper({ children }) {

  const [isEaster, toggleEaster] = useState(false);

  const changeTheme = () => {
    toggleEaster(isEaster => !isEaster)
  }

  return (
    <>
      <div className={`border-4 ${isEaster? "easter" : ""} border-skin-muted h-screen`}>
        <Navbar handler={changeTheme}></Navbar>
        {children}
      </div>
    </>
  )
}

