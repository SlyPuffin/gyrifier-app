import React from 'react'
import Link from "next/link"

// interface Deck {
//     id: number,
//     name: string,
//     cards?: object
// }

export default function SingleDeck(props: any) {
    const {id, name, deck} = props
    return (
        <div key={deck.id}>
            <div className="reviewButton">
                
                    <div className="cursor-pointer bg-orangeweboxfordblue-tertiary border-orangeweboxfordblue-border border-4 shadow-2xl text-4xl">
                    <div className="text-4xl px-8 py-2 text-orangeweboxfordblue-primary flex justify-between">
                        <li>{deck.name}</li>
                        <div className="flex">
                                <Link href={`/decks/practice/${deck.id}`}>
                                    <div className="w-10 h-10 rounded-full bg-red-400 flex justify-center">
                                        <div>P</div>
                                    </div>
                                </Link>
                                <Link href={`/decks/edit/${deck.id}`}>
                                    <div className="w-10 h-10 rounded-full bg-red-400 flex justify-center">
                                        <div>E</div>
                                    </div>
                                </Link>
                        </div>
                    </div>
                    </div>

            </div>
        </div>
    )
}
