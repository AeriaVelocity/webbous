/* Main App... for Webbous */

import React from "react";
import PowerOnSelfTest from "./PowerOnSelfTest.jsx";
import { CommandPrompt, OutputArea, handleCommandSubmit } from "./CommandProcessor.jsx";
import "./Webbous.css";

var commandHistory = [];

function WebbousBase() {
    const [outputMessages, setOutputMessages] = React.useState([]);

    const handleSubmit = (command) => {
        const newOutputMessages = handleCommandSubmit(command, outputMessages, setOutputMessages);
        commandHistory.push(command);
        console.log(commandHistory);
        setOutputMessages(newOutputMessages);
    };

    return (
        <div className="webbous-interface">
            <h3 className="output-title">Output Area</h3>
            <div className="output">
                <OutputArea outputMessages={outputMessages} />
            </div>

            <div className="command-prompt">
                <h3 className="command-prompt-title">Command Prompt</h3>
                <CommandPrompt onCommandSubmit={handleSubmit} />
            </div>
        </div>
    );
}

export default function WebbousApp() {
    return (
        <div className="WebbousApp">
            <h2>Webbous</h2>
            <PowerOnSelfTest />
            <WebbousBase />
        </div>
    );
}
