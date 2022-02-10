import { trpc } from "@/utils/trpc";
export default function NewDeck() {
  const newDeck = trpc.useMutation('add-deck');

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <form className="h-5/6 w-5/6 relative flex justify-center items-center" onSubmit={async (e) => {
        e.preventDefault();
        const $elements = (e as any).target.elements;
        const $title = $elements.title;
        const $description = $elements.description;

        const input = {
          title: $title.value,
          description: $description.value
        };
        try {
          await newDeck.mutateAsync(input);

          // $front.value = 'lol';
        } catch {}
      }}>
        <div className="text-orangeweboxfordblue-primary text-5xl shadow-2xl top-1">
          Title
        </div>
        <div className="flex h-4/5 w-4/5 bg-orangeweboxfordblue-primary justify-center items-center border-orangeweboxfordblue-border border-4 shadow-2xl rounded-[9rem]">
          <textarea id="title" name="title" className="text-orangeweboxfordblue-primary text-5xl"/>
        </div>
        <div className="text-orangeweboxfordblue-primary text-5xl shadow-2xl top-1">
          Description
        </div>
        <div className="flex h-4/5 w-4/5 bg-orangeweboxfordblue-primary justify-center items-center border-orangeweboxfordblue-border border-4 shadow-2xl rounded-[9rem]">
          <textarea id="description" name="description" className="text-orangeweboxfordblue-primary text-5xl"/>
        </div>
        <div className="absolute bg-orangeweboxfordblue-tertiary border-orangeweboxfordblue-border border-4 shadow-2xl text-4xl top-1 right-1">
          <input type="submit" className="text-4xl px-8 py-2 text-orangeweboxfordblue-primary">
          </input>
        </div>
      </form>
    </div>
  );
}
