import Options from "./Options.jsx";
import { useQuiz } from "../contexts/QuizContext.js";

export default function Question() {
    const {question, dispatch, answer} = useQuiz();

    return (
        <div>
            <h4>{question.question}</h4>
            <Options question={question} dispatch={dispatch} answer={answer}/>
        </div>
    )
}
