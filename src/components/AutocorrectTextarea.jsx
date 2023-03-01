import React, { useState } from 'react';

function AutocorrectTextarea({ corrections }) {
  const [text, setText] = useState('');
  const handleChange = (event) => {
    const inputText = event.target.value;
    console.log('handleChange called, inputText:', inputText);
    setText(inputText);
  };

  const handleKeyDown = (event) => {
    if (event.key === ' ') {
      const inputWords = text.trim().split(' ');
      const lastWord = inputWords.pop();
      if (lastWord) {
        const correctedWord = corrections[lastWord.toLowerCase()];
        if (correctedWord) {
          const correctedWords = [...inputWords, correctedWord];
          const correctedText = correctedWords.join(' ');
          setText(correctedText);
        }
      }
    }
  };
  return (
    <textarea value={text} onChange={handleChange} onKeyDown={handleKeyDown} />
  );
}

export default AutocorrectTextarea;