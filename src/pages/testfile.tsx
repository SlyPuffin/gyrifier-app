import { trpc } from "@/utils/trpc";
import React from "react";
import { useRouter } from "next/router";
import NextError from "next/error";
import Link from "next/link";



export default function TestPage() {
    const sayHi = trpc.useQuery(["say-hi"])
    // const myAsyncLogger = async () => {
    //     return sayHi.data?.hi as string
    // }
    const dude = sayHi.data.hi

    const returnable = async () => {
        return sayHi.data.hi
    }

    let jonsey = returnable().then((val) => console.log(val))
    console.log(jonsey)

    return (
        <button className="bg-green-300 border-green-600 border-b p-4 m-4 rounded">Start {dude}</button>

    )
}

