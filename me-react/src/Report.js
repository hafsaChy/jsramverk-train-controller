import React, { useEffect, useState } from 'react';

const Report = ({ match }) => {
  const kmom = match.params.kmom;
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch(`https://me-api.jsramverk.se/reports/${kmom}`)
      .then(res => res.json())
      .then(res => setQuestions(res.data));
  });

  const QuestionsList = () =>
    questions.map((question, index) => (
      <div className="question" key={index}>
        <p>
          <strong>{question.question}</strong>
        </p>
        <p>{question.answer}</p>
      </div>
    ));

  return (
    <main>
      <h2>{kmom}</h2>
      <QuestionsList />
    </main>
  );
};

export default Report;
