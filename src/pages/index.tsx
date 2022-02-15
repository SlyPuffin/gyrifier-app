import { trpc } from "@/utils/trpc";
import React from "react";
import Link from "next/link";
import { DxDeck } from "@prisma/client";
import { randomUUID } from "crypto";
import { Navbar } from "../utils/navbar";

export default function Home() {
   return (
      <Navbar>Hello</Navbar>
   )
}
