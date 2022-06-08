import React, { useState } from "react";
import { Navbar } from "@/utils/navbar";

export default function Layout({ children }) {
  const [currentTheme, toggleTheme] = useState(false);

  const changeTheme = (option) => {
    toggleTheme(option);
  };

  const props = {
    changeTheme
  }

  return (
    <>
      <div className={`${currentTheme || ""} bg-skin-primary h-screen`}>
        <Navbar {...props}></Navbar>
        {children}
      </div>
    </>
  );
}


