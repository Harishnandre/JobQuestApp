import React, { useState, useEffect } from 'react';
import './index.css';

const questionsData = [
  { 
    question: "What is MongoDB best suited for?", 
    options: [
      "Relational data storage", 
      "Hierarchical data storage", 
      "Non-relational, document-oriented data storage", 
      "Structured data storage"
    ], 
    answer: "Non-relational, document-oriented data storage" 
  },
  { 
    question: "Which method is used to insert a document into a MongoDB collection?", 
    options: ["insert()", "add()", "push()", "store()"], 
    answer: "insert()" 
  },
  { 
    question: "In MongoDB, what does CRUD stand for?", 
    options: ["Create, Read, Update, Delete", "Connect, Replace, Upload, Download", "Call, Respond, Update, Destroy", "Create, Retrieve, Update, Drop"], 
    answer: "Create, Read, Update, Delete" 
  },
  { 
    question: "What is the purpose of Mongoose in a Node.js application?", 
    options: [
      "To render HTML views", 
      "To manage cookies", 
      "To provide a schema-based solution for MongoDB", 
      "To handle frontend routing"
    ], 
    answer: "To provide a schema-based solution for MongoDB" 
  },
  { 
    question: "Which React hook is used to handle side effects?", 
    options: ["useState", "useEffect", "useContext", "useReducer"], 
    answer: "useEffect" 
  },
  { 
    question: "How do you start an Express server on port 3000?", 
    options: [
      "app.listen(3000)", 
      "app.init(3000)", 
      "server.start(3000)", 
      "server.listen(3000)"
    ], 
    answer: "app.listen(3000)" 
  },
  { 
    question: "Which command is used to install Express in a Node project?", 
    options: ["npm install express", "npm start express", "npm run express", "npm download express"], 
    answer: "npm install express" 
  },
  { 
    question: "What is JSX in React?", 
    options: [
      "A templating engine for Node.js", 
      "A syntax extension for JavaScript", 
      "A styling library for React", 
      "A database query language"
    ], 
    answer: "A syntax extension for JavaScript" 
  },
  { 
    question: "Which function in Express is used to handle HTTP GET requests?", 
    options: ["app.post()", "app.get()", "app.use()", "app.send()"], 
    answer: "app.get()" 
  },
  { 
    question: "In MongoDB, which data type is used to store large binary data such as images?", 
    options: ["Blob", "GridFS", "Binary", "FileStorage"], 
    answer: "GridFS" 
  },
  { 
    question: "How do you define a component in React?", 
    options: [
      "function MyComponent() {}", 
      "class MyComponent {}", 
      "const MyComponent = () => {}", 
      "All of the above"
    ], 
    answer: "All of the above" 
  },
  { 
    question: "What does the 'res.send()' method do in Express?", 
    options: [
      "Sends a response back to the client", 
      "Sends data to the database", 
      "Sends an error to the client", 
      "Routes to another handler"
    ], 
    answer: "Sends a response back to the client" 
  },
  { 
    question: "Which of the following is used to establish a connection between Node.js and MongoDB?", 
    options: ["MongoClient", "Mongoose", "dbConnect", "Both MongoClient and Mongoose"], 
    answer: "Both MongoClient and Mongoose" 
  },
  { 
    question: "In React, what does 'props' stand for?", 
    options: [
      "Properties", 
      "Proposals", 
      "Protocols", 
      "Processing"
    ], 
    answer: "Properties" 
  },
  { 
    question: "What is the main purpose of Express.js?", 
    options: [
      "To handle routing and middleware", 
      "To render the frontend", 
      "To style HTML pages", 
      "To query MongoDB"
    ], 
    answer: "To handle routing and middleware" 
  },
  { 
    question: "Which method is used to retrieve data from a MongoDB collection in Mongoose?", 
    options: ["find()", "fetch()", "retrieve()", "collect()"], 
    answer: "find()" 
  },
  { 
    question: "In React, how can you manage local state within a component?", 
    options: ["useState()", "useEffect()", "useReducer()", "useContext()"], 
    answer: "useState()" 
  },
  { 
    question: "Which of the following is a MongoDB aggregation operation?", 
    options: ["filter()", "group()", "map()", "transform()"], 
    answer: "group()" 
  },
  { 
    question: "What is middleware in Express?", 
    options: [
      "A function executed after a response", 
      "A function that processes requests before they reach the route handler", 
      "A built-in error handler", 
      "A function that sends data to the client"
    ], 
    answer: "A function that processes requests before they reach the route handler" 
  },
  { 
    question: "In React, what is the purpose of useContext?", 
    options: [
      "To set up context for the whole app", 
      "To share state between components without passing props", 
      "To run side effects", 
      "To handle state within a component"
    ], 
    answer: "To share state between components without passing props" 
  }
];


const QuizPage = () => {
  const [showInstructions, setShowInstructions] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [showResult, setShowResult] = useState(false);
  const [answerStatus, setAnswerStatus] = useState(null); // null, 'correct', or 'incorrect'

  const currentQuestion = questionsData[currentQuestionIndex];

  useEffect(() => {
    if (showInstructions || showResult) return; //jab dono me se koi ek display ho toh timer start nah hojae

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => { //prevtime=timeleft
        if (prevTime <= 1) {
          handleNextQuestion(false); 
          return 15;
        }
        return prevTime - 1;
      });
    }, 1000); //run every 1 sec

    return () => clearInterval(timer);
  }, [showInstructions, showResult, currentQuestionIndex]);

  const handleAnswerSelection = (option) => {
    setSelectedAnswer(option);
    const isCorrect = option === currentQuestion.answer;
    setAnswerStatus(isCorrect ? "correct" : "incorrect");

    if (isCorrect) setScore((prevScore) => prevScore + 1);
  };

  const handleNextQuestion = (resetTimer = true) => {
    if (resetTimer) setTimeLeft(15);
    setSelectedAnswer("");
    setAnswerStatus(null);

    if (currentQuestionIndex < questionsData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleStartQuiz = () => {
    setShowInstructions(false);
  };

  const handleRestartQuiz = () => {
    setShowInstructions(true);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setTimeLeft(15);
    setSelectedAnswer("");
    setAnswerStatus(null);
  };

  return (
    <div className="quiz-container">
      {showInstructions ? (
        <div className="instructions">
          <h2>Quiz Instructions</h2>
          <p>Welcome to the quiz! You have 15 seconds to answer each question. Select the correct answer to score points.</p>
          <button onClick={handleStartQuiz} className="start-quiz-btn">Start Quiz</button>
        </div>
      ) : showResult ? (
        <div className="result">
          <h2>Quiz Completed</h2>
          <p>Your Score: {(score / questionsData.length) * 100}%</p>
          <button onClick={handleRestartQuiz} className="restart-quiz-btn">Restart Quiz</button>
        </div>
      ) : (
        <div className="question-section">
          <h2>Question {currentQuestionIndex + 1} of {questionsData.length}</h2>
          <p>{currentQuestion.question}</p>
          <div className="options">
            {currentQuestion.options.map((option) => (
              <button
                key={option}
                className={`option-btn ${selectedAnswer === option ? (answerStatus === "correct" ? "correct" : "incorrect") : ""}`}
                onClick={() => handleAnswerSelection(option)}
                disabled={!!selectedAnswer}
              >
                {option}
              </button>
            ))}
          </div>
          {selectedAnswer && (
            <button onClick={() => handleNextQuestion(true)} className="next-btn">
              Next Question
            </button>
          )}
          <div className="timer">Time Left: {timeLeft}s</div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
