import React, { Component } from 'react'
import { trpc } from "@/utils/trpc";
import Link from "next/link";
import Image from "next/image"
import puffin from "../../public/puffin.svg"



export class Navbar extends Component {

  constructor(props: any) {
    super(props)
    this.dealWithClick = this.dealWithClick.bind(this)
  }

  dealWithClick() {
    this.props.changeTheme()
  }

  checkEaster() {
    return this.props.isEaster
  }

  render() {
    return (
      <nav className="bg-skin-secondary px-2 sm:px-4 py-2.5">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <a href="#" className="flex">
            <Image src={puffin} height={30} width={30}></Image>
            <span className="self-center text-lg font-semibold whitespace-nowrap text-skin-secondary">Gyrifier</span>
          </a>
          <button data-collapse-toggle="mobile-menu" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
            <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
          </button>

          <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <div className={`md:hover:text-skin-muted text-skin-secondary ${this.checkEaster() ? "bg-skin-special rounded-md px-1" : ""}`} onClick={this.dealWithClick}>
              Easterize
            </div>
            <Link href="/" >
              <a className="y-2 pr-4 pl-3 text-skin-secondary md:hover:bg-transparent md:border-0 md:hover:text-skin-muted md:p-0  " aria-current="page">Home</a>
            </Link>
            <Link href="/decks" >
              <a className="block py-2 pr-4 pl-3 text-skin-secondary  md:hover:bg-transparent md:border-0 md:hover:text-skin-muted md:p-0  ">Decks</a>
            </Link>
            <li>
              <a href="https://github.com/SlyPuffin/gyrifier-app" target="_" className="block py-2 pr-4 pl-3 text-skin-secondary border-b  md:hover:bg-transparent md:border-0 md:hover:text-skin-muted md:p-0  ">Git</a>
            </li>

          </ul>
        </div>
      </nav>
    )
  }
}
