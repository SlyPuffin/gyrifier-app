import { trpc } from "@/utils/trpc";
import React from "react";
export default function Home() {
  const { data, isLoading } = trpc.useQuery(["get-deck"]);

  type CardProps = {};
  type CardState = {
    isFront: boolean;
    cardNumber: number;
    bars: number;
    level: number;
  };

  class Card extends React.Component<CardProps, CardState> {
    state: CardState = {
      isFront: true,
      cardNumber: 0,
      bars: 0,
      level: 0,
    };

    componentDidMount() {
      this.next();
    }

    render() {
      if (data) {
        return (
          <div className="h-screen w-screen flex justify-center items-center">
            <div className="h-5/6 w-5/6 relative flex justify-center items-center">
              <div className="absolute text-orangeweboxfordblue-primary text-5xl shadow-2xl top-1">
                {data.cards[this.state.cardNumber].source
                  ? data.cards[this.state.cardNumber].source
                  : ""}
              </div>
              <div className="cursor-pointer absolute bg-orangeweboxfordblue-tertiary border-orangeweboxfordblue-border border-4 shadow-2xl text-4xl top-1 right-1">
                <div className="text-4xl px-8 py-2 text-orangeweboxfordblue-primary">
                  Back
                </div>
              </div>
              <div
                onClick={() => {
                  this.flip();
                }}
                className="cursor-pointer relative flex h-4/5 w-4/5 bg-orangeweboxfordblue-primary justify-center items-center border-orangeweboxfordblue-border border-4 shadow-2xl rounded-[9rem]"
              >
                <div className="text-orangeweboxfordblue-secondary text-5xl">
                  {this.state.isFront
                    ? data.cards[this.state.cardNumber].front
                    : data.cards[this.state.cardNumber].back}
                </div>
              </div>
              <div
                onClick={() => {
                  this.next();
                }}
                className="cursor-pointer absolute flex w-36 h-36 bottom-[8%] right-[8%] justify-center items-center group bg-orangeweboxfordblue-tertiary border-orangeweboxfordblue-border border-4 shadow-2xl rounded-full"
              >
                <div className="absolute text-8xl text-orangeweboxfordblue-primary visible group-hover:invisible">
                  12
                </div>
                <div className="absolute text-8xl text-orangeweboxfordblue-primary invisible group-hover:visible">
                  →
                </div>
              </div>
              <div className="absolute flex flex-row space-x-5 bottom-[8%] left-[8%]">
                <div className="text-6xl py-2 w-8 text-orangeweboxfordblue-primary">
                  {this.state.level}
                </div>
                <div className="flex flex-row shadow-2xl border-orangeweboxfordblue-border border-2">
                  <div
                    className={`px-12 py-10 border-orangeweboxfordblue-border border-r-2 ${this.getColorAndBorder(
                      1
                    )}`}
                  ></div>
                  <div
                    className={`px-12 py-10 border-orangeweboxfordblue-border border-r-2 ${this.getColorAndBorder(
                      2
                    )}`}
                  ></div>
                  <div
                    className={`px-12 py-10 border-orangeweboxfordblue-border ${this.getColorAndBorder(
                      3
                    )}`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
    flip = () => {
      this.setState((state) => ({
        isFront: !state.isFront,
      }));
    };
    getColorAndBorder = (row: number) => {
      if (this.state.bars >= row) {
        return "bg-orangeweboxfordblue-tertiary";
      } else {
        return "bg-orangeweboxfordblue-quaternary border-dotted";
      }
    };
    next = () => {
      var nextCard = this.state.cardNumber + 1,
        frontSide = true,
        exp = 0,
        lvl = 0,
        brs = 0;
      // Move the array forward to the next card
      if (data && nextCard >= data.cards.length) {
        nextCard = 0;
      }
      // Calculate info for the xp bar
      exp = data ? data.cards[nextCard].xp : 0;
      if (exp < 3) {
        lvl = 1;
        brs = exp;
      } else if (exp < 6) {
        lvl = 2;
        brs = exp - 3;
      } else {
        lvl = 3;
        brs = exp - 6;
        if (brs > 3) brs = 3;
      }
      this.setState((state) => ({
        cardNumber: nextCard,
        isFront: frontSide,
        level: lvl,
        bars: brs,
      }));
    };
  }

  if (isLoading)
    return <div className="text-black flex justify-center">Loading...</div>;
  if (data) return <Card />;
}
