import { trpc } from "@/utils/trpc";
export default function NewCard() {
  const { data, isLoading } = trpc.useQuery(["get-random-card"]);
  const newCard = trpc.useMutation('add-card');
  const decksData = trpc.useQuery(["get-decks"]);

  let decksList = decksData.data?.decks.map((deck) => {
    return (<option key={deck.id} value={deck.id}>{deck.title}</option>)
  });

  

  if (isLoading)
    return <div className="text-black flex justify-center">Loading...</div>;
  if (data)
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <form className="h-5/6 w-5/6 relative flex justify-center items-center" onSubmit={async (e) => {
          e.preventDefault();
          /**
           * In a real app you probably don't want to use this manually
           * Checkout React Hook Form - it works great with tRPC
           * @link https://react-hook-form.com/
           */

          const $front: HTMLInputElement = (e as any).target.elements.front;
          const $deckId: HTMLInputElement = (e as any).target.elements.deckId;
          const input = {
            front: $front.value,
            deckId: parseInt($deckId.value)
          };
          try {
            await newCard.mutateAsync(input);

            $front.value = 'submitted!';
          } catch {
            $front.value = 'error';
          }
        }}>
          <div className="absolute flex justify-center bsolute text-orangeweboxfordblue-primary text-5xl shadow-2xl top-10">
            <div className="text-orangeweboxfordblue-primary text-2l">
                NEW CARD
            </div>
            <div className="absolute top-10">
                <div className="text-orangeweboxfordblue-primary text-base top-5">
                    Deck: 
                </div>
                <div className="mb-2 xl:w-96 top-5">
                    <select id="deckId" className="form-select appearance-none
                                                block
                                                w-full
                                                px-3
                                                py-1.5
                                                text-base
                                                font-normal
                                                text-gray-700
                                                bg-white bg-clip-padding bg-no-repeat
                                                border border-solid border-gray-300
                                                rounded
                                                transition
                                                ease-in-out
                                                m-0
                                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">
                        {decksList}
                    </select>
                </div>
            </div>  
          </div>
          <div className="absolute bg-orangeweboxfordblue-tertiary border-orangeweboxfordblue-border border-4 shadow-2xl text-4xl top-1 right-1">
            <input type="submit" className="text-4xl px-8 py-2 text-orangeweboxfordblue-primary">
            </input>
          </div>
          <div className="relative flex h-4/5 w-4/5 bg-orangeweboxfordblue-primary justify-center items-center border-orangeweboxfordblue-border border-4 shadow-2xl rounded-[9rem] top-20">
            <div className="text-white text-base">
                Front: 
            </div>
            <textarea id="front" name="front" className="text-orangeweboxfordblue-primary text-5xl"/>
          </div>
        </form>
      </div>
    );
}
