export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="relative flex h-4/6 w-4/6 bg-cyan-600 justify-center items-center border-slate-400 border-4">
        <div className="text-3xl">Front Side</div>
        <div className="absolute text-2xl bottom-1 left-2">Level [X--]</div>
        <div className="absolute text-2xl bottom-1 right-2">
          Source Material
        </div>
      </div>
    </div>
  );
}
