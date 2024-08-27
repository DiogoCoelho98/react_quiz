import { useContext, createContext } from "react";
import {useEffect, useReducer} from "react";

const secondsPerQuest = 20;

function reducer(state, action) { 
  switch(action.type) {
    case "dataReceived":
      return {
        ...state, 
        questions: action.payload, 
        status: "ready"
      };

    case "dataFailed":
      return {
        ...state, 
        status: "error"
      };

    case "start":
      return {
        ...state, 
        status: "active", 
        timer: state.questions.length * secondsPerQuest
      };

    case "newAnswer":
      const currentQuestion = state.questions[state.index];
      const isCorrect = action.payload === currentQuestion.correctOption;
      return {
        ...state, 
        answer: action.payload, 
        points: state.points + (isCorrect ? currentQuestion.points : 0) 
      };

    case "nextQuestion":
      return {
        ...state, 
        index: state.index + 1, 
        answer: null
      };
    case "finish":
      return {
        ...state, 
        status: "finished", 
        highScore: state.points > state.highScore ? state.points : state.highScore 
      };

    case "reset":
      return {
        ...state, 
        index: 0, 
        answer: null, 
        points: 0, 
        status: "ready", 
        timer: 10
      };

    case "timer":
      return {
        ...state, 
        timer: state.timer - 1, 
        status: state.timer === 0 ? "finished" : state.status
      };

    default:
      throw new Error("Data not available");
  };
}

const initialValue = {
    questions: [], 
    status: "loading", 
    index: 0, 
    answer: null, 
    points: 0, 
    highScore: 0, 
    timer: null
};

const QuizContext = createContext();

function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialValue);
  const { 
    questions, 
    status, 
    index, 
    answer, 
    points, 
    highScore, 
    timer 
  } = state;

  const numQuestions = questions.length;

  const maxPoints = questions.reduce((acc, curr) => acc + curr.points, 0);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();
        
        dispatch({ type: "dataReceived", payload: data })
      } catch(err) {
          dispatch({ type: "dataFailed", payload: err.message });
      }
    }
    getData();
  }, [])

    return(
        <QuizContext.Provider value={{
            questions,
            status, 
            index, 
            answer, 
            points, 
            highScore,
            timer,
            maxPoints, 
            numQuestions,
            dispatch
        }}>
            {children}
        </QuizContext.Provider>
    )
}

function useQuiz() {
    const context = useContext(QuizContext);
    if (context === undefined) throw new Error("QuizContext outside of the QuizProvider")

    return context;
}

export { QuizProvider, useQuiz };


