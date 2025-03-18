import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    fetch('/questions.json')
      .then(res => res.json())
      .then(data => setQuestions(data));
  }, []);

  const handleOptionChange = (e) => {
    setSelected(e.target.value);
  };

  const handleNext = () => {
    if (selected === questions[current].answer) {
      setScore(score + 1);
    }

    setSelected(''); // Clear selection

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  

  return (
    <>
    {showResult ? (
        <div>
          <h2>Your Score: {score} / {questions.length}</h2>
          <button onClick={() => window.location.reload()}>Restart</button>
        </div>
      ) : (
      <div className='quiz-container'>
        <div className='quizzes'>
          <div className='editer-theme'><div style={{backgroundColor: "#FFD710"}}></div><div style={{backgroundColor: "#569CD6"}}></div><div style={{backgroundColor: "#64C991"}}></div></div>
          <hr/>
          <p className='questions'>{questions[current].question}</p>
          <form>
            {questions[current].options.map((opt, id) => (
              <div key={id}>
                <input
                  type="radio"
                  id={`opt${id}`}
                  name="option"
                  value={opt}
                  checked={selected === opt}
                  onChange={handleOptionChange}
                />
                <label htmlFor={`opt${id}`}>{opt}</label>
              </div>
            ))}
          </form>
          <br />
          <button onClick={handleNext} disabled={!selected}>Next</button>
        </div>
      </div>
       )}
    </>
  );
}

export default App;
