import { trpc } from "@/utils/trpc";
import React from "react";
import Link from "next/link";
import { DxDeck } from "@prisma/client";
import { randomUUID } from "crypto";
import { Navbar } from "../utils/navbar";

export default function Home() {
   return (
    <button className="bg-green-300 border-green-600 border-b p-4 m-4 rounded">Dummy Button</button>
   )
}
