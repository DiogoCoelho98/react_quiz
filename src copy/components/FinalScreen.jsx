import { useQuiz } from "../contexts/QuizContext";

export default function FinalScreen() {
    const { points, maxPoints, highScore, dispatch } = useQuiz();

    const percentage = (points / maxPoints) * 100;
    return (
        <div>
            <p className="result">You scored <strong>{points}</strong> out of {maxPoints} ({Math.ceil(percentage)}%)</p>
            <p className="highscore">Highscore: {highScore} points</p>
            <button className="btn btn-ui" onClick={() => dispatch({type: "reset"})}>Reset the Quiz</button>
        </div>
    )
}