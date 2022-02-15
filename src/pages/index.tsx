import { trpc } from "@/utils/trpc";
import React from "react";
import Link from "next/link";
import { DxDeck } from "@prisma/client";

export default function Home() {
  const { data, isLoading } = trpc.useQuery(["get-decks"], {
    refetchOnWindowFocus: false,
  });

  type DeckListProps = {
    decks: DxDeck[];
  };
  type DeckListState = {};

  class DeckList extends React.Component<DeckListProps, DeckListState> {
    render() {
      const listItems = this.props.decks.map((deck) => (
        <li className="flex">
          <DeckButton />
        </li>
        // <Link href={`/review/${deck.id}`}>
        //   <div className="cursor-pointer bg-orangeweboxfordblue-tertiary border-orangeweboxfordblue-border border-4 shadow-2xl text-4xl">
        //     <div className="text-4xl px-8 py-2 text-orangeweboxfordblue-primary">
        //       <li>{deck.name}</li>
        //     </div>
        //   </div>
        // </Link>
      ));
      return <ul className="flex">{listItems}</ul>;
    }
  }

  type DeckProps = {};
  type DeckState = {};

  class DeckButton extends React.Component<DeckProps, DeckState> {
    render() {
      return (
        <div className="cursor-pointer flex h-40 w-full bg-orangeweboxfordblue-primary justify-center items-center border-orangeweboxfordblue-border border-4 shadow-2xl rounded-[9rem]">
          ANYTHIUNG
        </div>
      );
    }
  }

  type CircleButtonProps = {
    text: string;
    url: string;
  };
  type CircleButtonState = {};

  class CircleButton extends React.Component<
    CircleButtonProps,
    CircleButtonState
  > {
    render() {
      return (
        <Link href={this.props.url}>
          <div className="cursor-pointer absolute flex w-36 h-36 bottom-[8%] right-[8%] opacity-[85%] hover:opacity-100 justify-center items-center group bg-orangeweboxfordblue-tertiary border-orangeweboxfordblue-border border-4 drop-shadow-2xl rounded-full">
            <div className="absolute text-4xl text-orangeweboxfordblue-primary visible group-hover:invisible">
              {this.props.text}
            </div>
            <div className="absolute text-4xl text-orangeweboxfordblue-primary invisible group-hover:visible">
              {this.props.text}
            </div>
          </div>
        </Link>
      );
    }
  }

  if (isLoading || !data) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="h-5/6 w-5/6 relative flex justify-center items-center">
          <div className="cursor-pointer bg-orangeweboxfordblue-tertiary border-orangeweboxfordblue-border border-4 drop-shadow-2xl text-4xl">
            <div className="text-4xl px-8 py-2 text-orangeweboxfordblue-primary">
              No Decks...
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (data) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="h-5/6 w-5/6 relative flex justify-center items-center grid-flow-row">
          <div className="absolute text-orangeweboxfordblue-primary text-5xl drop-shadow-2xl top-1">
            Gyrifier
          </div>
          <div className="flex w-full h-full relative justify-center items-center">
            <DeckList decks={data.decks} />
          </div>
          <div>
            <CircleButton text="Review" url="/review" />
          </div>
        </div>
      </div>
    );
  }
}
