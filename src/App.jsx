/* Main App... for Webbous */

import { useState, useEffect } from "react";
import { CommandPrompt, OutputArea, handleCommandSubmit } from "./CommandProcessor.jsx";

import defaultStyle from "./Webbous.css";

function SetStyling() {
    const styling = defaultStyle;
    return (
        <style>{styling}</style>
    );
}

var commandHistory = [];

function WebbousBase() {
    const [outputMessages, setOutputMessages] = useState([]);

    const handleSubmit = (command) => {
        const newOutputMessages = handleCommandSubmit(command, outputMessages, setOutputMessages);
        commandHistory.push(command);
        console.log(commandHistory);
        setOutputMessages(newOutputMessages);
    };

    useEffect(() => {
        document.title = "Webbous";
        handleSubmit("welcome")
    }, []);

    return (
        <div className="webbous-interface">
            <div className="interface-element">
                <h2>Webbous</h2>
            </div>
            <div className="interface-element output">
                <OutputArea outputMessages={outputMessages} />
            </div>

            <div className="interface-element command-prompt">
                <h3 className="command-prompt-title">Command Prompt</h3>
                <CommandPrompt onCommandSubmit={handleSubmit} />
            </div>
        </div>
    );
}

export default function WebbousApp() {
    return (
        <div className="WebbousApp">
            <WebbousBase />
        </div>
    );
}
