import React, { useState } from "react";
import { useFetchUser } from "@/auth/user";
import Link from "next/link";

export default function Home() {
  const { user, loading } = useFetchUser();
  return (
    <div className="w-full md:h-full">
      <button className="text-4xl px-8 py-2 text-skin-primary">
        Landing Page
      </button>
      {loading && <p>Loading login info...</p>}

      {!loading && !user && (
        <div className="h-2/3 w-screen flex justify-center items-center">
          <div className="text-3xl px-8 py-2 text-skin-primary">
            Welcome to Gyrifier! Please{" "}
            <i className="text-skin-secondary md:hover:text-skin-muted">
              <a href="/api/login">Login</a>
            </i>{" "}
            to continue.
          </div>
        </div>
      )}

      {user && (
        <div className="h-2/3 w-screen flex justify-center items-center">
          <img src={user.picture} alt="user picture" />
          <div className="text-3xl px-8 py-2 text-skin-primary">
            Welcome, {user.nickname}! Select{" "}
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
