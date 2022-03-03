import { Deck } from '@prisma/client'
import React from 'react'
import SingleDeck from './SingleDeck'

// ingest an array, a type of display object or react component, and a number of rows

interface GridDisplay {
    columns: number,
    itemType: any,
    arrayOfCardsOrDecks: Deck | Array // should this implement Deck type? 
}

export default function GridContainer(props: GridDisplay) {

  const {itemType, arrayOfCardsOrDecks, columns} = props
  
    const displayItemTypes = {
      "deckDisplay": SingleDeck
      }
      //card: SingleCard not its own compnent yet.
  
    const ComponentType = displayItemTypes[itemType]
    console.log("component Type is", ComponentType)
  
    // item will be either a returned decks or cards
    const display = arrayOfCardsOrDecks.map(cardOrDeck => {
      // each component should know how to render itself based on information given
      return <ComponentType props={cardOrDeck} key={cardOrDeck.id}></ComponentType>
    })
    
    return (
        <div>
          <div className={`grid-cols-${columns}`}>
              {display}
          </div>
        </div>
    )
  }

  
