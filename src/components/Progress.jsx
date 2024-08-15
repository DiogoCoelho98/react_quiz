export default function Progress({index, questions, points, maxPoints, answer}) {
    return (
        <div className="progress">
            {/* If null false it's converted to 0 */}
            <progress max={questions} value={index + Number(answer !== null)}></progress>

            <p>Question <strong>{index + 1}</strong> / {questions}</p>
            <p><strong>{points}</strong> / {maxPoints} </p>
        </div>
    )
}