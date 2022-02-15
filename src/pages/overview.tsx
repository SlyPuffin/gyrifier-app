import { trpc } from "@/utils/trpc";
import React from "react";
import Link from "next/link";
import { DxDeck } from "@prisma/client";
import { randomUUID } from "crypto";


export default function MakeDecks() {
    const { data, isLoading } = trpc.useQuery(["get-decks"]);

    type DeckProps = {
    decks: DxDeck[];
    };
    type DeckState = {};

    class Decks extends React.Component<DeckProps, DeckState> {
    render() {
        const listItems = this.props.decks.map((deck) => (
        <Link href={`/review/${deck.id}`} key={randomUUID}>
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

}
