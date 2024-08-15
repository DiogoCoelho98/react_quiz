import Header from "./Header.jsx";
import Principal from "./Principal.jsx";
import Loader from "./Loader.jsx";
import ErrorMessage from "./ErrorMessage.jsx";
import StartScreen from "./StartScreen.jsx";
import Question from "./Question.jsx";

import {useEffect, useReducer} from "react";

function reducer(state, action) {
  console.log(state)
  switch(action.type) {
    case "dataReceived":
      return {...state, questions: action.payload, status: "ready"};
    case "dataFailed":
      return {...state, status: "error"};
    case "start":
      return {...state, status: "active"};
    case "newAnswer":
      const currentQuestion = state.questions[state.index];
      const isCorrect = action.payload === currentQuestion.correctOption;

      return {...state, answer: action.payload, points: state.points + (isCorrect ? currentQuestion.points : 0) };
    default:
      throw new Error("Data not available");
  }
}

const initialValue = {questions: [], status: "loading", index: 0, answer: null, points: 0};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialValue);
  const {questions, status, index, answer} = state;

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();
        
        dispatch({type: "dataReceived", payload: data})
      } catch(err) {
          dispatch({type: "dataFailed", payload: err.message});
      }
    }
    getData();
  }, [])
  return (
    <div className="app">
      <Header />

      <Principal>
        {status === "loading" && <Loader />}
        {status === "error" && <ErrorMessage />}
        {status === "ready" && <StartScreen questions={questions.length} dispatch={dispatch}/>}
        {status === "active" && <Question question={questions[index]} dispatch={dispatch} answer={answer}/>}
      </Principal>
    </div>
  )
}