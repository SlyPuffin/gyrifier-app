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
        <Link href={`/decks/practice/${deck.id}`} key={deck.id}>
          <div className="border-primary cursor-pointer border-4 bg-skin-secondary text-4xl shadow-2xl">
            <div className="px-8 py-2 text-4xl text-skin-secondary">
              <li>{deck.name}</li>
            </div>
          </div>
        </Link>
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
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="relative flex h-5/6 w-5/6 items-center justify-center">
          <ul>
            <form onSubmit={handleDeckSubmit}>
              <input
                id="name"
                name="name"
                className="border-primary border-4 px-8 py-2 text-4xl text-skin-primary shadow-2xl"
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
