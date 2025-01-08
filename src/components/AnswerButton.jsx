import React from 'react';
import './AnswerButton.css';

const AnswerButton = ({ answer, onClick, disabled, selected, correct, incorrect }) => {
  let buttonClass = 'answer-button';

  if (selected) {
    buttonClass = ' answer-button selected';
  }
  if (correct) {
    buttonClass = 'answer-button correct';
  }
  if (incorrect) {
    buttonClass = 'answer-button incorrect';
  }
  if (disabled) {
    buttonClass = 'answer-button disabled';
  }

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
    >
      <span dangerouslySetInnerHTML={{ __html: answer }} />
    </button>
  );
};

export default AnswerButton;
