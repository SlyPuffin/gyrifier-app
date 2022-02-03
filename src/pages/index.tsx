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
    countdown: number;
  };

  class Card extends React.Component<CardProps, CardState> {
    private timerID: number = 0;
    state: CardState = {
      isFront: true,
      cardNumber: 0,
      bars: 0,
      level: 0,
      countdown: 12,
    };

    componentDidMount() {
      // NOTE: This seems to reset when 'looking away' from the window
      this.updateStateForCardIndex(this.state.cardNumber);
      this.timerID = window.setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
      clearInterval(this.timerID);
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
                  {this.state.countdown}
                </div>
                <div className="absolute text-8xl text-orangeweboxfordblue-primary invisible group-hover:visible">
                  →
                </div>
              </div>
              <div className="absolute flex flex-row space-x-5 bottom-[8%] left-[8%]">
                <div className="text-6xl py-2 w-8 text-orangeweboxfordblue-primary">
                  {this.state.level}
                </div>
                <div className="flex flex-row shadow-2xl border-orangeweboxfordblue-border border-l-2 border-y-2">
                  <div
                    className={`${this.getWidth(
                      this.state.level
                    )} py-10 border-orangeweboxfordblue-border border-r-2 ${this.getColorAndBorder(
                      1,
                      this.state.level
                    )}`}
                  ></div>
                  <div
                    className={`${this.getWidth(
                      this.state.level
                    )} py-10 border-orangeweboxfordblue-border border-r-2 ${this.getColorAndBorder(
                      2,
                      this.state.level
                    )}`}
                  ></div>
                  <div
                    className={`${this.getWidth(
                      this.state.level
                    )} py-10 border-orangeweboxfordblue-border border-r-2 ${this.getColorAndBorder(
                      3,
                      this.state.level
                    )}`}
                  ></div>
                  {this.state.level > 1 && (
                    <div
                      className={`${this.getWidth(
                        this.state.level
                      )} py-10 border-orangeweboxfordblue-border border-r-2 ${this.getColorAndBorder(
                        4,
                        this.state.level
                      )}`}
                    ></div>
                  )}
                  {this.state.level > 2 && (
                    <div
                      className={`${this.getWidth(
                        this.state.level
                      )} py-10 border-orangeweboxfordblue-border border-r-2 ${this.getColorAndBorder(
                        5,
                        this.state.level
                      )}`}
                    ></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
    tick = () => {
      var newTime = this.state.countdown - 1;
      if (newTime < 0) {
        this.next();
      } else {
        this.setState({
          countdown: newTime,
        });
      }
    };
    flip = () => {
      this.setState((state) => ({
        isFront: !state.isFront,
      }));
    };
    getColorAndBorder = (row: number, level: number) => {
      if (this.state.bars >= row) {
        return "bg-orangeweboxfordblue-tertiary";
      } else if (row - level === 2) {
        return "bg-orangeweboxfordblue-quaternary";
      } else {
        return "bg-orangeweboxfordblue-quaternary border-dotted";
      }
    };
    getWidth = (level: number) => {
      switch (level) {
        case 1:
          return "px-12";
        case 2:
          return "px-9";
        case 3:
          return "px-7";
        default:
      }
    };
    updateStateForCardIndex = (currentCard: number) => {
      var frontSide = true,
        exp = 0,
        lvl = 0,
        brs = 0,
        timer = 12;
      exp = data ? data.cards[currentCard].xp : 0;
      if (exp < 3) {
        lvl = 1;
        brs = exp;
      } else if (exp < 7) {
        lvl = 2;
        brs = exp - 3;
      } else {
        lvl = 3;
        brs = exp - 7;
        if (brs > 5) brs = 5;
      }
      this.setState((state) => ({
        isFront: frontSide,
        level: lvl,
        bars: brs,
        countdown: timer,
        cardNumber: currentCard,
      }));
    };
    next = () => {
      var nextCard = this.state.cardNumber + 1;
      if (data && nextCard >= data.cards.length) {
        nextCard = 0;
      }
      this.updateStateForCardIndex(nextCard);
    };
  }

  if (isLoading)
    return <div className="text-black flex justify-center">Loading...</div>;
  if (data) return <Card />;
}
