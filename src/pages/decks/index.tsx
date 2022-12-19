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
          <button key={deck.id} className="cursor-default border-primary flex flex-row justify-center items-center w-screen md:w-full h-28 md:h-40 border-4 bg-skin-secondary text-sm shadow-lg md:text-4xl md:shadow-2xl group">
            <Link href={`/decks/practice/${deck.id}`}>
              <div className="cursor-pointer relative flex flex-initial px-2 md:px-8 w-20 h-20 md:w-36 md:h-36 justify-center items-center text-skin-primary bg-skin-contrast border-primary border-2 shadow-lg md:border-4 md:shadow-2xl rounded-full invisible group-hover:visible group-focus:visible">
                Practice
              </div>
            </Link>
            <div className="flex flex-col">
              <div className="px-3 md:px-8 py-2 text-base md:text-4xl flex flex-initial justify-center items-center text-skin-secondary">
                <li>{deck.name}</li>
              </div>
              <div className="text-sm md:text-base flex flex-initial justify-center text-skin-secondary">
                {deck.cards ? deck.cards.length : 0} Cards
              </div>
            </div>
            <Link href={`/decks/edit/${deck.id}`}>
              <div className="cursor-pointer relative flex flex-initial px-2 md:px-8 w-20 h-20 md:w-36 md:h-36 justify-center items-center text-skin-primary bg-skin-contrast border-primary border-2 shadow-lg md:border-4 md:shadow-2xl rounded-full invisible group-hover:visible group-focus:visible">
                Edit
              </div>
            </Link>
            <div className="cursor-pointer relative flex flex-initial px-2 md:px-8 w-20 h-20 md:w-36 md:h-36 justify-center items-center text-skin-primary bg-skin-contrast border-primary border-2 shadow-lg md:border-4 md:shadow-2xl rounded-full invisible group-hover:visible group-focus:visible">
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
      <div className="flex w-screen md:w-auto items-center md:justify-center">
        <div className="overflow-auto relative flex w-screen md:w-5/6 items-center md:justify-center">
          <ul>
            <form onSubmit={handleDeckSubmit}>
              <input
                id="name"
                name="name"
                className="flex w-screen md:w-full border-primary border-4 px-8 py-2 text-4xl text-skin-primary shadow-2xl md:justify-center"
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
