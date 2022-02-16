import { trpc } from "@/utils/trpc";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import NextError from "next/error";
import Link from "next/link";
import Image from "next/image"
import puffin from "../../public/puffin.svg"



export default function TestPage() {
    const myName: any = {myname: "Thomas"}
    const sayHi = trpc.useQuery(["say-hi"])
  
    const name = sayHi.data?.hi ? sayHi.data.hi : "Anonymous";

    useEffect(() => {
        console.log("component mounted")
    })

    return (
        <div>
            <button className="bg-green-300 border-green-600 border-b p-4 m-4 rounded">Start {name} </button>
        </div>

    )
}

