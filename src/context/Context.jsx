import { createContext, useState } from "react";
import run from "../config/gemini-api.js";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading,setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayParam = (index, nextWord) => {
        setTimeout(function () {
            setResultData(prev=>prev+nextWord)
        },75*index)
    }

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        setRecentPrompt(input);
        setPrevPrompt(prev=>[...prev, input])
        const response = await run(input);
        let responseArray = response.split("**");
        let newResponseFirst="";
        for (let i=0; i < responseArray.length; i++) {
            if (i === 0 || i%2 !== 1) {
                newResponseFirst += responseArray[i]
            }
            else {
                newResponseFirst += "<b>" + responseArray[i]+"</b>";
            }
        };
        let newResponseSecond = newResponseFirst.split("*").join("</br>")
        let newResponseFinal = newResponseSecond.split(" ");
        for(let i = 0; i < newResponseFinal.length; i++) {
            const nextWord = newResponseFinal[i];
            delayParam(i, nextWord+" ")
        }
        setLoading(false);
        setInput("");
    }

    const contextValue = {
        prevPrompt,
        setPrevPrompt,
        onSent,
        recentPrompt,
        setRecentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;