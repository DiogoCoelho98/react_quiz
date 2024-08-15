export default function Options({ question, dispatch, answer }) {
    console.log(question)
    if (!question || !question.options) {
      return null;
    }
  
    const hasAnswered = answer !== null;
  
    return (
      <div className="options">
        {question.options.map((option, index) => {

          const isCorrect = index === question.correctOption;
          const isSelected = index === answer;
  
          return (

            <button
              className={`btn btn-option 
                ${isSelected ? "answer" : ""} 
                ${hasAnswered && isCorrect ? "correct" : ""}
                ${hasAnswered && isSelected && !isCorrect ? "wrong" : ""}
              `}
              key={index}
              onClick={() => dispatch({ type: "newAnswer", payload: index })}
              disabled={hasAnswered}
            >
              {option}
            </button>

          );
        })}
      </div>
    );
  }
  