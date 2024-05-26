import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, } from "@radix-ui/themes";

import { GameStatusEnum } from "../../types/globalTypes";
import { addChosenLetter, incrementErrorsCount } from "../../store/game/game.action";
import { selectChosenLetters, selectGameStatus, selectQuote } from "../../store/game/game.selector";
import { Word } from "..";
import './quote.styles.scss';

const alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

interface GameBoardProps {
  blindQuote: string[][];
}

const Quote = (props: GameBoardProps) => {
  const { blindQuote } = props;
  const dispatch = useDispatch();
  const quote = useSelector(selectQuote);
  const chosenLetters = useSelector(selectChosenLetters)
  const gameStatus = useSelector(selectGameStatus);

  const quoteText = useMemo(() => {
    return blindQuote.map((word: string[], index: number) => (
      <Word key={index} word={word} />
    ));
  }, [blindQuote]);

  const isDisabled = (letter: string) => {
    return gameStatus !== GameStatusEnum.Playing || chosenLetters.includes(letter);
  }

  const handleButtonClick = (letter: string) => {
    dispatch(addChosenLetter(letter));
   
    const quoteContainsCurrentLetter = quote.content.toLowerCase().includes(letter?.toLowerCase());
    if (!quoteContainsCurrentLetter) {
      dispatch(incrementErrorsCount());
    }
  }

  const renderButtons = () => {
    return alphabet.map((letter: string) => (
      <Button
        key={letter}
        disabled={isDisabled(letter)}
        onClick={() => handleButtonClick(letter)}
        value={letter}>
        {letter}
      </Button>
    ))
  }

  return (
    <>
      <div className='game-quote'>
        <div className="quote-content">
          {quoteText}
        </div>
        <div className="quote-author">Author: {quote.author}</div>
      </div>

      <div className="quote-buttons">
        {renderButtons()}
      </div>
    </>
  )
}

export default Quote;