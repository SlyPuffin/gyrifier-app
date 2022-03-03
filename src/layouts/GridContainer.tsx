import React, { useEffect, useState } from 'react'
import SingleDeck from './SingleDeck'

// ingest an array, a type of display object or react component, and a number of rows

// interface GridDisplay {
//     columns: number,
//     itemType: any,
//     items: any // should this implement Deck type? 
// }

export default function GridContainer(props: any) {

  console.log(props.props)

  const {columns, itemType, arrayOfCardsOrDecks} = props.props

  let [dataStatus, updateDataStatus] = useState(false)
  let [propStatus, updatePropsStatus] = useState({})

  useEffect(() => {
      console.log("useEffectFiring", props)
      updateDataStatus(true)
      updatePropsStatus(props)
  }, [props, dataStatus])
  
  if(!dataStatus) {
    // console.log(dataStatus)
    console.log("Data STATUS", dataStatus)
    return (
      <div>
          <button className="text-4xl px-8 py-2 text-orangeweboxfordblue-primary">
            Landing Page 
          </button>
      </div>
    )
  }

  if(dataStatus) {
    console.log("trying to render the real page")
    
    const displayItemTypes = {
      "deckDisplay": SingleDeck
      }
      //card: SingleCard not its own compnent yet.
  
    const ComponentType = displayItemTypes[itemType]
    console.log(ComponentType)
  
    // item will be either a returned decks or cards
    const display = arrayOfCardsOrDecks?.map(cardOrDeck => {
      // each component should know how to render itself based on information given
      return <ComponentType props={cardOrDeck} key={cardOrDeck.id}></ComponentType>
    })

    console.log("display", display)
    
    return (
        <div>
          <div className={`grid-cols-${columns}`}>
              {display}
          </div>
        </div>
    )
    }

  }
  


