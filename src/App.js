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

    setSelected('');

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  if (questions.length === 0) 
  return <p>Loading...</p>;

  const resetQuiz = () => {
    setCurrent(0);
    setScore(0);
    setShowResult(false);
    setSelected('');
  };

  return (
    <>
      <div className='quiz-container'>
      <div className='child-container'>
      <h4>React Quiz App</h4>
      <p className='description'>Test your React knowledge with multiple-choice questions. Learn as you play!</p>
      <div className='quizzes'>
      <div className='editer-theme'><div style={{backgroundColor: "#FFD710"}}></div><div style={{backgroundColor: "#569CD6"}}></div><div style={{backgroundColor: "#64C991"}}></div></div>
      <hr/>
      {showResult ? (
        <div className='restart'>
          <div>
          <h2>Your Score: {score} / {questions.length}</h2>
          <button onClick={resetQuiz}>Restart</button>
          </div>
        </div>
      ) : (
        <div className='question-container'>
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
                <label For={`opt${id}`}>{opt}</label>
              </div>
            ))}
          </form>
          <br />
          <div className='next-container'><button style={{color:!selected ? "gray" : "#001427" }} className='nextbtn' onClick={handleNext} disabled={!selected}>Next</button></div>
          </div>
        )}
        </div>
        </div>
      </div>
    </>
  );
}

export default App;
