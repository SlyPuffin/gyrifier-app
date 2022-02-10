import Link from 'next/link'
import { trpc } from "@/utils/trpc";
export default function Home() {
  const { data, isLoading } = trpc.useQuery(["get-random-card"]);
  const newCard = trpc.useMutation('add-card');

  if (isLoading)
    return <div className="text-black flex justify-center">Loading...</div>;
  if (data)
    console.log(data.card);
    return (
      <div>
        <div className="h-5/6 w-5/6 relative flex justify-center items-center">
          <Link href="/card/new">
            <a className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">New Card</a>
          </Link>
        </div>
        <div className="h-screen w-screen flex justify-center items-center">
          <div className="h-5/6 w-5/6 relative flex justify-center items-center">
            <div className="absolute text-orangeweboxfordblue-primary text-5xl shadow-2xl top-1">
              Card {data.card.id} from {data.card.deckId !== null ? 'deck ' + data.card.Deck.title : 'no deck'}
            </div>
            <div className="absolute bg-orangeweboxfordblue-tertiary border-orangeweboxfordblue-border border-4 shadow-2xl text-4xl top-1 right-1">
              <div className="text-4xl px-8 py-2 text-orangeweboxfordblue-primary">
                Back
              </div>
            </div>
            <div className="relative flex h-4/5 w-4/5 bg-orangeweboxfordblue-primary justify-center items-center border-orangeweboxfordblue-border border-4 shadow-2xl rounded-[9rem]">
              <div className="text-orangeweboxfordblue-secondary text-5xl">
                {data.card.front}
              </div>
            </div>
            <div className="absolute flex flex-row space-x-5 bottom-[8%] left-[8%]">
              <div className="text-6xl py-2 text-orangeweboxfordblue-primary">
                1
              </div>
              <div className="flex flex-row shadow-2xl border-orangeweboxfordblue-border border-2">
                <div className="bg-orangeweboxfordblue-tertiary px-12 py-10 border-orangeweboxfordblue-border border-r-2"></div>
                <div className="bg-orangeweboxfordblue-quaternary px-12 py-10 border-orangeweboxfordblue-border border-r-2 border-dotted"></div>
                <div className="bg-orangeweboxfordblue-quaternary px-12 py-10 border-orangeweboxfordblue-border"></div>
              </div>
            </div>
            <div className="absolute flex w-36 h-36 bottom-[8%] right-[8%] justify-center items-center group bg-orangeweboxfordblue-tertiary border-orangeweboxfordblue-border border-4 shadow-2xl rounded-full">
              <div className="absolute text-8xl text-orangeweboxfordblue-primary visible group-hover:invisible">
                12
              </div>
              <div className="absolute text-8xl text-orangeweboxfordblue-primary invisible group-hover:visible">
                →
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
