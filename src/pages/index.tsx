import { trpc } from "@/utils/trpc";
import React from "react";
import Link from "next/link";
<<<<<<< HEAD
import { Deck } from "@prisma/client";

export default function Home() {
<<<<<<< HEAD
  const userQuery = trpc.useQuery(["get-user"], {
    refetchOnWindowFocus: false,
  });
  const { data, isLoading } = trpc.useQuery(
    [
      "get-decks-for-user",
      { id: userQuery.data?.user?.id ? userQuery.data?.user?.id : "" },
    ],
    {
      refetchOnWindowFocus: false,
    }
  );

  type DeckProps = {
    decks: Deck[];
  };
  type DeckState = {};

  class Decks extends React.Component<DeckProps, DeckState> {
    render() {
      const listItems = this.props.decks.map((deck) => (
        <Link href={`/review/${deck.id}`}>
          <div className="cursor-pointer bg-orangeweboxfordblue-tertiary border-orangeweboxfordblue-border border-4 shadow-2xl text-4xl">
            <div className="text-4xl px-8 py-2 text-orangeweboxfordblue-primary">
              <li>{deck.name}</li>
            </div>
          </div>
        </Link>
      ));
      return <ul>{listItems}</ul>;
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
          <Decks decks={data.decks} />
        </div>
      </div>
    );
  }
=======
>>>>>>> 0d9ce7a (added navbar to utils and separated deck overview into own file)
=======
>>>>>>> d48d198 (added layout directory, NavbarWrapper layout, and implemented it in _app)
}
