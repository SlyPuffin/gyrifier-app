import React from 'react'
import SingleDeck from './SingleDeck'

// ingest an array, a type of display object or react component, and a number of rows

// interface GridDisplay {
//     columns: number,
//     itemType: any,
//     items: any // should this implement Deck type? 
// }

function GridContainer(props: any) {
  const {columns, itemType, arrayOfCardsOrDecks} = props
 
  // items should be an array. So should it be descturcture here?
  // called with data.cards

  const displayItemTypes = {
    deck: {
      componentName: SingleDeck,
      infoNeeded: []
    },
    //card: SingleCard not its own compnent yet.
  }

  const ComponentType = displayItemTypes[itemType.componentName]

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

export default GridContainer