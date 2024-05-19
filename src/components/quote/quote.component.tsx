import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectQuote } from "../../store/game/game.selector";
import { Button, } from "@radix-ui/themes";
import './quote.styles.scss';
import { Label } from "@radix-ui/react-label";

const alphabet: string[] = ['A', 'B', 'C', 'D', 'E', 'F',
  'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
  'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

const Quote = () => {
  const [blindQuoteContent, setBlindQuoteContent] = useState<string>('');
  const [chosenLetters, setChosenLetters] = useState<string[]>([]);
  const [currentLetter, setCurrentLetter] = useState<string>();
  const [errors, setErrors] = useState<number>(0);
  const quote = useSelector(selectQuote);

  useEffect(() => {
    const quoteWithSpaces = addSpaceAfterEveryCharacter(quote?.content || '');
    const blindQuote = replaceLettersWithUnderscore(quoteWithSpaces);
    setBlindQuoteContent(blindQuote);
    setChosenLetters([]);
    setErrors(0);
  },[quote]);

  useEffect(() => {
    //set blind quote content
    const quoteWithSpaces = addSpaceAfterEveryCharacter(quote?.content || '');
    const blindQuote = replaceLettersWithUnderscore(quoteWithSpaces, chosenLetters);
    setBlindQuoteContent(blindQuote);

    //set errors
    const contains: boolean = blindQuote.split('').some((l: string) => l.toLowerCase() === currentLetter?.toLowerCase());
    setErrors(prevState => contains === true ? prevState : prevState + 1 );
  }, [chosenLetters]);

  function replaceLettersWithUnderscore(str: string, chosenLetters: string[] = []): string {
    // Create a set of chosen letters for quick lookup, handling case insensitivity.
    const chosenSet = new Set(chosenLetters.map(letter => letter.toLowerCase()));

    // Use a regular expression to replace all alphabetic characters, considering case insensitivity.
    return str.replace(/[a-zA-Z]/g, match => {
      return chosenSet.has(match.toLowerCase()) ? match : '_';
    });
  }

  const addSpaceAfterEveryCharacter = (str: string): string => {
    return str
        .split('')
        .map(char => char === ' ' ? '\u00A0\u00A0' : `${char}\u00A0`)
        .join('')
        .trimEnd();
}

  const isDisabled = (letter: string) => {
    return chosenLetters.includes(letter);
  }

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.target as HTMLButtonElement;
    const letter = button.value;
    setChosenLetters(prevState => [...prevState, letter]);
    setCurrentLetter(letter);
  }

  return (
    <>
      <div className='game-quote'>
        <span className="quote-content">"{blindQuoteContent}"</span>
        <div className="quote-author">Author: {quote.author}</div>
      </div>
      <Label>Errors: {errors}</Label>
      <div className="quote-buttons">
        {alphabet.map((letter: string) => (
          <Button key={letter} disabled={isDisabled(letter)} onClick={handleButtonClick} value={letter}>
            {letter}
          </Button>
        ))}
      </div>
    </>
  )
}

export default Quote;