import { trpc } from "@/utils/trpc";
import React, { useState } from "react";
import Link from "next/link";
import { Deck } from "@prisma/client";

export default function Home() {
  return (
    <button className="text-4xl px-8 py-2 text-orangeweboxfordblue-primary">
      Landing Page 
    </button>
  )
}
 

  const [decks, setDecks] = React.useState<Deck[]>(data?.decks || []);

  const handleDeckSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = (e as any).target.elements.name;

    const input = {
      name: name.value,
      type: "default",
      userId: userQuery.data?.user?.id || ''
    };
    const deck = await addDeckMutation.mutateAsync(input);
    setDecks(decks.concat(deck));
    name.value = '';
  }

  type DeckProps = {
    decks: Deck[];
  };
  type DeckState = {};

  class Decks extends React.Component<DeckProps, DeckState> {
    render() {
      return this.props.decks.map((deck) => (
        <Link href={`/review/${deck.id}`} key={deck.id}>
          <div className="cursor-pointer bg-orangeweboxfordblue-tertiary border-orangeweboxfordblue-border border-4 shadow-2xl text-4xl">
            <div className="text-4xl px-8 py-2 text-orangeweboxfordblue-primary">
              <li>{deck.name}</li>
            </div>
          </div>
        </Link>
      ));
    }
  }

  if (isLoading || !data) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="h-5/6 w-5/6 relative flex justify-center items-center">
          <div className="cursor-pointer bg-orangeweboxfordblue-tertiary border-orangeweboxfordblue-border border-4 shadow-2xl text-4xl">
            No Decks...
          </div>
        </div>
      </div>
    );
  }
  if (data) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="h-5/6 w-5/6 relative flex justify-center items-center">
          <ul>
            <form onSubmit={handleDeckSubmit}>
              <input id="name" name="name" className="border-orangeweboxfordblue-border border-4 shadow-2xl text-4xl px-8 py-2 text-orangeweboxfordblue-primary" placeholder="New Deck"/>
              <input type="submit" className="hidden"/>
            </form>
            <Decks decks={decks} />
          </ul>
        </div>
      </div>
    );
  }
}
