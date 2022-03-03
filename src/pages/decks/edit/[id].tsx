import { useRouter } from 'next/router'
import { trpc } from '@/utils/trpc'
import React from 'react'

// import VariableGrid from utils/VariableGrid

interface deckName {
    deckName: string
}

function EditDeck() {
    const deckID = useRouter().query.id as string;
    const {isLoading, data, error} = trpc.useQuery(["get-cards-from-deck", {id: deckID}])
    
    if (isLoading) {
        console.log("loading")
        return <>Loading...</>;
      }
    if (error) {
        console.log(error)
    }

    if (data) {
        return (
            <div>
                <MakeDisplayBar></MakeDisplayBar>
                 <div className="text-4xl px-8 py-2 text-orangeweboxfordblue-primary">
                    {data.cards[0].front}
                </div>
            </div>
        )
    }
}

function MakeDisplayBar() {
    const deckID = useRouter().query.id as string;

    const {isLoading: alsoIsLoading, data: alsoData, error: alsoError} = trpc.useQuery(["get-name-for-deck", { id: deckID }])

    let loadingMessage = "loading or error"
    if (alsoIsLoading || alsoError) {
        return (
            <div className="text-4xl px-8 py-2 text-orangeweboxfordblue-primary">
                {loadingMessage}
            </div>
        )
    }


    if (alsoData) {
        return (
            <div className="text-4xl px-8 py-2 text-orangeweboxfordblue-primary">
               <div>{alsoData.name?.name}</div>
            </div>
        )
    }
}

export default EditDeck