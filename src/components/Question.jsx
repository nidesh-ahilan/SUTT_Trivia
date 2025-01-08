import React from 'react';

const Question = ({ question }) => {
  return (
    <div className="question">
      <h3 dangerouslySetInnerHTML={{ __html: question }} />
    </div>
  );
};

export default Question;

