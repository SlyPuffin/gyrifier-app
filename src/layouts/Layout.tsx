import React, { useState } from "react";
import { Navbar } from "@/utils/navbar";

export default function Layout({ children }) {
  const [currentTheme, toggleTheme] = useState(false);

  const changeTheme = (option) => {
    toggleTheme(option);
  };

  let propsObj = {
    changeTheme: changeTheme,
    currentTheme: currentTheme,
  };

  return (
    <>
      <div className={`${currentTheme || ""} bg-skin-primary h-screen`}>
        <Navbar {...propsObj}></Navbar>
        {children}
      </div>
    </>
  );
}


