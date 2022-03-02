import React from 'react'
import Link from "next/link"

export default function SingleDeck(props: any) {
    return (
        <div key={props.deck.id}>
            <div className="editButton">
            <Link href={`/decks/practice/${props.deck.id}`}>
                <div className="cursor-pointer bg-orangeweboxfordblue-tertiary border-orangeweboxfordblue-border border-4 shadow-2xl text-4xl">
                <div className="text-4xl px-8 py-2 text-orangeweboxfordblue-primary">
                    <li>{props.deck.name}</li>
                </div>
                </div>
            </Link>
            </div>
        </div>
    )
}
