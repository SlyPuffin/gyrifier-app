import React, { useState } from "react";
import { useFetchUser } from "@/auth/user";
import Link from "next/link";

export default function Home() {
  const { authUser, isAuthUserLoading } = useFetchUser();
  return (
    <div className="w-full md:h-full">
      <button className="px-8 py-2 text-4xl text-skin-primary">
        Landing Page
      </button>
      {isAuthUserLoading && <p>Loading login info...</p>}

      {!isAuthUserLoading && !authUser && (
        <div className="flex h-2/3 w-screen items-center justify-center">
          <div className="px-8 py-2 text-3xl text-skin-primary">
            Welcome to Gyrifier! Please{" "}
            <i className="text-skin-secondary md:hover:text-skin-muted">
              <Link href="/api/login">Login</Link>
            </i>{" "}
            to continue.
          </div>
        </div>
      )}

      {authUser && (
        <div className="flex h-2/3 w-screen items-center justify-center">
          <img src={authUser.picture} alt="user picture" />
          <div className="px-8 py-2 text-3xl text-skin-primary">
            Welcome, {authUser.name}! Select{" "}
            <i className="text-skin-secondary md:hover:text-skin-muted">
              <Link href="/decks">Decks</Link>
            </i>{" "}
            in the header menu to start studying.
          </div>
        </div>
      )}
    </div>
  );
}
