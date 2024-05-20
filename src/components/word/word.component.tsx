import React from "react";

interface WordProps {
  word: string[];
}

const Word = React.memo((props: WordProps) => {
  const { word } = props;

  return (
    <div className="quote-word">
      {word.map((char, index) => (
        <span key={index} className="quote-mark">{char}</span>
      ))}
    </div>
  )
})

export default Word;