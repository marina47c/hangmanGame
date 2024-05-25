import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, } from "@radix-ui/themes";

import { postHighscore } from "../../utils/axios/axios.utils";
import { HighscoreData, PostHighscoreData } from "../../types/globalTypes";
import { addChosenLetter, clearChosenLetters, incrementErrorsCount, setErrorsCount } from "../../store/game/game.action";
import { selectChosenLetters, selectErrorsCount, selectQuote } from "../../store/game/game.selector";
import { getUser } from "../../utils/authentication/authentication.utils";
import { Dialog, Word } from "..";
import './gameBoard.styles.scss';

const alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const specialCharacters: string[] = ['.', ',', '"', '\'', '?', '!', ':', '&', ' '];
const errorsBrakepoint: number = 1;

enum GameStatus {
  Fail = 'fail',
  Success = 'success',
  Playing = 'playing'
}

const GameBoard = () => {
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Playing);
  const [gameStartTime, setGameStartTime] = useState<number>();

  const dispatch = useDispatch();
  const quote = useSelector(selectQuote);
  const errorsCount = useSelector(selectErrorsCount);
  const chosenLetters = useSelector(selectChosenLetters)

  const blindQuote = useMemo(() => {
    return quote.content.split(' ').map((word: string) => {
      return word.split('').map((mark: string) => {
        const markIsSpecialCharacter: boolean = specialCharacters.some((character: string) => character === mark);
        const markISInChosenLetters: boolean = chosenLetters.some((letter: string) => letter.toLowerCase() === mark.toLowerCase());
        return (markIsSpecialCharacter || markISInChosenLetters) ? mark : '_';
      });
    });
  }, [quote.content, chosenLetters]);

  const uniqueCharacters = useMemo(() => {
    const uniqueCharacters = new Set(quote.content);
    return uniqueCharacters.size;
  }, [quote.content]);

  const quoteText = useMemo(() => {
    return blindQuote.map((word: string[], index: number) => (
      <Word key={index} word={word} />
    ));
  }, [blindQuote]);

  useEffect(() => {
    if (!blindQuote || blindQuote.length === 0){
      return;
    }

    const isGameSuccessful = blindQuote.flat().every((char: string) => char !== '_');
    if (isGameSuccessful){
      setGameStatus(GameStatus.Success);
    }
  }, [blindQuote]);

  useEffect(() => {
    if (errorsCount > errorsBrakepoint) {
      setGameStatus(GameStatus.Fail);
    }
  }, [errorsCount]);

  useEffect(() => {
    if (gameStatus === GameStatus.Fail || gameStatus === GameStatus.Success){
      const duration = gameStartTime ? Date.now() - gameStartTime : 0;

      const data: PostHighscoreData = {
        quoteId: quote._id,
        length: quote.content.length,
        uniqueCharacters: uniqueCharacters,
        userName: getUser(),
        errors: errorsCount,
        duration: duration
      }

      const postResult = async (data: HighscoreData) => {
        await postHighscore(data);
      }

      postResult(data);
    }
  }, [gameStatus])

  const resetGameState = () => {
    dispatch(clearChosenLetters())
    setGameStatus(GameStatus.Playing);
    setGameStartTime(Date.now());
    dispatch(setErrorsCount(0));
  }

  const isDisabled = (letter: string) => {
    return gameStatus !== GameStatus.Playing || chosenLetters.includes(letter);
  }

  const handleButtonClick = (letter: string) => {
    dispatch(addChosenLetter(letter));
   
    const quoteContainsCurrentLetter = quote.content.toLowerCase().includes(letter?.toLowerCase());
    if (!quoteContainsCurrentLetter) {
      dispatch(incrementErrorsCount());
    }
  }

  const handleDialogButtonClick = () => {

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

      {(gameStatus === GameStatus.Fail|| gameStatus === GameStatus.Success) && (
        <div>
          <Dialog
            title={gameStatus === GameStatus.Success ? "Game Success" : "Game Over"}
            description={gameStatus === GameStatus.Success ? "You won!" : "You fail!"}
            onClick={handleDialogButtonClick}
          />
        </div>
      )}
    </>
  )
}

export default GameBoard;