import {useReducer} from "react";

function reduce(state,action){
    switch(action.type) {
        case "add":
            return {...state,count: state.count + action.payload};
        case "sub":
            return {...state, count: state.count - action.payload};
        case "reset":
            return {count: 0, step: 1};
        case "setCount":
            return {...state, count: action.payload};
        case "setStep":
            return {...state, step: action.payload};
        default:
            throw new Error("GET FUCKED!!!!!");
    }    
}

export default function DateCounter() {
    const initialState = {count: 0, step: 1};

    const [state,dispatch] = useReducer(reduce,initialState);
    const {count,step} = state;

    const date = new Date("june 21 2027");
    date.setDate(date.getDate() + count);

    function handleAdd(){
        dispatch({type: "add", payload: step});
    }
    function handleSub(){
        dispatch({type: "sub", payload: step});
    }
    function handleCount(e){
        dispatch({type: "setCount", payload: Number(e.target.value)});
    }
    function handleStep(e){
        dispatch({type: "setStep", payload: Number(e.target.value)});
    }
    function reset(){
        dispatch({type: "reset"})
    }
    

    return (
         <div className="counter">

            <div> <input type="range" min="0" max="10" value={step} onChange={handleStep}/></div>
            <span>{step}</span>

            <div>
                <button onClick={handleSub}>-</button>
                <input type="text" value={count} onChange={handleCount}/>
                <button onClick={handleAdd}>+</button>
            </div>

            <p>{date.toDateString()}</p>

            <div>
                <button onClick={reset}>Reset</button>
            </div>

        </div> 
    )
}