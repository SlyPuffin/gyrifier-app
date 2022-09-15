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
      <div className={`${currentTheme || ""} h-screen bg-skin-primary`}>
        <Navbar {...propsObj}></Navbar>
        {children}
      </div>
    </>
  );
}
