import { trpc } from "@/utils/trpc";
import React, { useState } from "react";
import Link from "next/link";
import { useFetchUser } from "@/auth/user";
import { Deck } from "@prisma/client";

export default function Home() {
  const { authUser, isAuthUserLoading } = useFetchUser();
  const { data, isLoading } = trpc.useQuery(
    ["get-decks-for-user", { id: !isAuthUserLoading ? authUser?.sub : "" }],
    {
      refetchOnWindowFocus: false,
    }
  );
  const addDeckMutation = trpc.useMutation("add-deck");

  const [decks, setDecks] = React.useState<Deck[]>(data?.decks || []);

  const handleDeckSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = (e as any).target.elements.name;

    const input = {
      name: name.value,
      type: "default",
      userId: authUser?.sub || "",
    };
    const deck = await addDeckMutation.mutateAsync(input);
    setDecks(decks.concat(deck));
    name.value = "";
  };

  type DeckProps = {
    decks: Deck[];
  };
  type DeckState = {};

  class Decks extends React.Component<DeckProps, DeckState> {
    render() {
      return this.props.decks.map((deck) => (
        <button
          key={deck.id}
          className="border-primary group flex h-28 w-screen cursor-default flex-row items-center justify-center border-4 bg-skin-secondary text-sm shadow-lg md:h-40 md:w-full md:text-4xl md:shadow-2xl"
        >
          <Link href={`/decks/practice/${deck.id}`}>
            <div className="border-primary invisible relative flex h-20 w-20 flex-initial cursor-pointer items-center justify-center rounded-full border-2 bg-skin-contrast px-2 text-skin-primary shadow-lg group-hover:visible group-focus:visible md:h-36 md:w-36 md:border-4 md:px-8 md:shadow-2xl">
              Practice
            </div>
          </Link>
          <div className="flex flex-initial items-center justify-center px-3 py-2 text-base text-skin-secondary md:px-8 md:text-4xl">
            <li>{deck.name}</li>
          </div>
          <Link href={`/decks/edit/${deck.id}`}>
            <div className="border-primary invisible relative flex h-20 w-20 flex-initial cursor-pointer items-center justify-center rounded-full border-2 bg-skin-contrast px-2 text-skin-primary shadow-lg group-hover:visible group-focus:visible md:h-36 md:w-36 md:border-4 md:px-8 md:shadow-2xl">
              Edit
            </div>
          </Link>
          <div className="border-primary invisible relative flex h-20 w-20 flex-initial cursor-pointer items-center justify-center rounded-full border-2 bg-skin-contrast px-2 text-skin-primary shadow-lg group-hover:visible group-focus:visible md:h-36 md:w-36 md:border-4 md:px-8 md:shadow-2xl">
            Delete
          </div>
        </button>
      ));
    }
  }

  if (isAuthUserLoading || (authUser && isLoading)) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="relative flex h-5/6 w-5/6 items-center justify-center">
          <div className="cursor-pointer border-4 border-skin-secondary bg-skin-secondary text-4xl text-skin-secondary shadow-2xl">
            Loading
          </div>
        </div>
      </div>
    );
  }
  if (!isAuthUserLoading && !authUser) {
    return (
      <div className="flex h-2/3 w-screen items-center justify-center">
        <div className="px-8 py-2 text-3xl text-skin-primary">
          Please{" "}
          <i className="text-skin-secondary md:hover:text-skin-muted">
            <Link href="/api/login">Login</Link>
          </i>{" "}
          to start studying.
        </div>
      </div>
    );
  }
  if (data && authUser) {
    return (
      <div className="flex w-screen items-center md:w-auto md:justify-center">
        <div className="relative flex w-screen items-center overflow-auto md:w-5/6 md:justify-center">
          <ul>
            <form onSubmit={handleDeckSubmit}>
              <input
                id="name"
                name="name"
                className="border-primary flex w-screen border-4 px-8 py-2 text-4xl text-skin-primary shadow-2xl md:w-full md:justify-center"
                placeholder="New Deck"
              />
              <input type="submit" className="hidden" />
            </form>
            <Decks decks={decks} />
          </ul>
        </div>
      </div>
    );
  }
}
