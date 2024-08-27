import { useQuiz } from "../contexts/QuizContext"

export default function Progress() {
    const {index, questions, points, maxPoints, answer} = useQuiz();

    return (
        <div className="progress">
            {/* If null false it's converted to 0 */}
            <progress max={questions} value={index + Number(answer !== null)}></progress>

            <p>Question <strong>{index + 1}</strong> / {questions}</p>
            <p><strong>{points}</strong> / {maxPoints} </p>
        </div>
    )
}