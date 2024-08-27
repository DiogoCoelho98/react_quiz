import {useEffect} from "react";
import { useQuiz } from "../contexts/QuizContext";

export default function Timer() {
    const {timer, dispatch} = useQuiz();

    const mins = Math.floor(timer / 60);
    const seconds = timer % 60;
    
    useEffect(() => {
        const id = setInterval(() => {
            dispatch({type: "timer"})
        }, 1000)
        return () => clearInterval(id);
    }, [dispatch]);

    return (
        <div className="timer">
            {mins < 10 && "0"}
            {mins}:{seconds < 10 && "0"}
            {seconds}
        </div>
    )
}