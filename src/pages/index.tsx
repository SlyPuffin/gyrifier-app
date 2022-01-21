import { trpc } from "@/utils/trpc";
export default function Home() {
  const { data, isLoading } = trpc.useQuery(["hello", { text: "flashcards" }]);

  if (isLoading) return <div className="text-black">Loading...</div>;
  if (data)
    return (
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <div className="relative flex h-4/6 w-4/6 bg-orangeweboxfordblue-primary justify-center items-center border-orangeweboxfordblue-border border-4 shadow-2xl rounded-3xl">
          <div className="text-orangeweboxfordblue-secondary text-3xl">
            {data.greeting}
          </div>
          <div className="absolute bottom-1 left-2">
            <div className="text-3xl text-orangeweboxfordblue-primary">1</div>
            <div className="text-3xl text-orangeweboxfordblue-tertiary">
              [X--]
            </div>
          </div>
          <div className="absolute text-orangeweboxfordblue-quaternary text-2xl bottom-1 right-2">
            Source Material
          </div>
        </div>
      </div>
    );
}
