import { useQuiz } from "../contexts/QuizContext.js";

export default function NextButton() {
    const { dispatch, answer, index, questions } = useQuiz();

    if (answer === null) return null;

    if (index <  questions - 1) {   
        return <button className="btn btn-ui" onClick={() => dispatch({type: "nextQuestion"})}>Next Question</button>
    }

    if (index === questions - 1) {
        return <button className="btn btn-ui" onClick={() => dispatch({type: "finish"})}>Finish the Quiz</button>
            }
}