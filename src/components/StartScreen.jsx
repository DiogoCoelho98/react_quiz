export default function StartScreen({questions, dispatch}) {
    return (
        <div className="start">
            <h2>Welcome to the React Quiz</h2>
            <h3>{questions} questions to test your React knowledge</h3>
            <button onClick={() => dispatch({type: "start"})} className="btn btn-ui">Let's Start</button>
        </div>
    )
}   