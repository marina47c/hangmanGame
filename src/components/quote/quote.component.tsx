import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectQuote } from "../../store/game/game.selector";
import { Button, } from "@radix-ui/themes";
import './quote.styles.scss';
import { Label } from "@radix-ui/react-label";
import React from "react";
import { Word } from "..";
import DialogDemo from "../radixDialog/radixDialog.component";

const alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const specialCharacters: string[] = ['.', ',', '"', '\'', '?', '!', ':', '&', ' '];
const errosBrakepoint: number = 1;

const Quote = () => {
  const [blindQuote, setBlindQuote] = useState<string[][]>([]);
  const [chosenLetters, setChosenLetters] = useState<string[]>([]);
  const [currentLetter, setCurrentLetter] = useState<string>();
  const [errors, setErrors] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameSuccess, setGameSuccess] = useState<boolean>(false);
  const quote = useSelector(selectQuote);

  useEffect(() => {
    setBlindQuote(getBlindQuote(quote.content, chosenLetters));
  },[quote, chosenLetters]);

  useEffect(() => {
    setChosenLetters([]);
    setErrors(0);
  }, [quote]);

  useEffect(() => {
    if (chosenLetters.length > 0){
      const contains = quote.content.toLowerCase().includes(currentLetter?.toLowerCase());
      setErrors(prevErrors => contains ? prevErrors : prevErrors + 1);
    }
  }, [chosenLetters, currentLetter, quote.content]);

  useEffect(() => {
    if (errors > errosBrakepoint){
      setGameOver(true);
    }
  }, [errors])

  const getBlindQuote = useCallback((quote: string, choosenLetters: string[] = []) => {
    return quote.split(' ').map((word: string) => {
      return word.split('').map((mark: string) => {
        const markIsSpecialCharacter: boolean = specialCharacters.some((character: string) => character === mark);
        const markISInChosenLetters: boolean = choosenLetters.some((letter: string) => letter.toLowerCase() === mark.toLowerCase());
        return (markIsSpecialCharacter || markISInChosenLetters) ? mark : '_';  
      });
    });
  }, []);

  const isDisabled = (letter: string) => {
    return chosenLetters.includes(letter);
  }

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.target as HTMLButtonElement;
    const letter = button.value;
    setChosenLetters(prevState => [...prevState, letter]);
    setCurrentLetter(letter);
  }

  const Quote = () => {
    return blindQuote.map((word: string[], index: number) => 
      <Word key={index} word={word} />
    )
  };

  return (
    <>
      <div className='game-quote'>
        <div className="quote-content">
          {Quote()}
        </div>
        <div className="quote-author">Author: {quote.author}</div>
      </div>
     
      <div className="quote-buttons">
        {alphabet.map((letter: string) => (
          <Button key={letter} disabled={isDisabled(letter)} onClick={handleButtonClick} value={letter}>
            {letter}
          </Button>
        ))}
      </div>

      <Label>Errors: {errors}</Label>

      {gameOver && (
         <div>
         <DialogDemo></DialogDemo>
       </div>
       
      )}
    </>
  )
}

export default Quote;