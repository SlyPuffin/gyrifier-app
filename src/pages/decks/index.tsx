import { trpc } from "@/utils/trpc";
import React, { useState } from "react";
import Link from "next/link";
import { useFetchUser } from "@/auth/user";

export default function Home() {
  const { user, loading } = useFetchUser();
  const userQuery = trpc.useQuery(
    ["get-user", { email: user?.name ? user?.name : "" }],
    {
      refetchOnWindowFocus: false,
    }
  );
  const { data, isLoading } = trpc.useQuery(
    [
      "get-decks-for-user",
      { id: userQuery.data?.user?.id ? userQuery.data?.user?.id : "" },
    ],
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
      userId: userQuery.data?.user?.id || "",
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
          <div className="cursor-pointer bg-skin-secondary border-primary border-4 shadow-2xl text-4xl">
            <div className="text-4xl px-8 py-2 text-skin-primary">
              <li>{deck.name}</li>
            </div>
          </div>
        </Link>
      ));
    }
  }

  if (loading || (user && isLoading)) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="h-5/6 w-5/6 relative flex justify-center items-center">
          <div className="cursor-pointer bg-skin-secondary border-skin-secondary border-4 shadow-2xl text-4xl text-skin-secondary">
            Loading
          </div>
        </div>
      </div>
    );
  }
  if (!loading && !user) {
    return (
      <div className="h-2/3 w-screen flex justify-center items-center">
        <div className="text-3xl px-8 py-2 text-skin-primary">
          Please{" "}
          <i className="text-skin-secondary md:hover:text-skin-muted">
            <a href="/api/login">Login</a>
          </i>{" "}
          to start studying.
        </div>
      </div>
    );
  }
  if (data && user) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="h-5/6 w-5/6 relative flex justify-center items-center">
          <ul>
            <form onSubmit={handleDeckSubmit}>
              <input
                id="name"
                name="name"
                className="border-primary border-4 shadow-2xl text-4xl px-8 py-2 text-skin-primary"
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
