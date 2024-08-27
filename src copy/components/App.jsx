import Header from "./Header.jsx";
import Principal from "./Principal.jsx";
import Loader from "./Loader.jsx";
import ErrorMessage from "./ErrorMessage.jsx";
import StartScreen from "./StartScreen.jsx";
import Question from "./Question.jsx";
import NextButton from "./NextButton.jsx";
import Progress from "./Progress.jsx"; 
import FinalScreen from "./FinalScreen.jsx"
import Timer from "./Timer.jsx";

import { useQuiz } from "../contexts/QuizContext.js";

export default function App() {
  const { status } = useQuiz();

  return (
    <div className="app">
      <Header />

      <Principal>
        {status === "loading" && <Loader />}
        {status === "error" && <ErrorMessage />}
        {status === "ready" && <StartScreen />}
        {status === "active" && 
          <>
            <Progress/>
            <Question /> 
            <NextButton />
            <Timer />
          </>
          }
          {status === "finished" && <FinalScreen />}
      </Principal>
    </div>
  )
}