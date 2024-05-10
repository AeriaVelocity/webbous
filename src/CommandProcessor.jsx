/* Command Processor... for Webbous */

import { useState } from "react";
import PowerOnSelfTest from "./PowerOnSelfTest.jsx";

export function CommandPrompt({onCommandSubmit}) {
    const [command, setCommand] = useState("");

    function handleChange(event) {
        setCommand(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        onCommandSubmit(command);
        setCommand("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={command} onChange={handleChange} autoFocus />
        </form>
    );
}

export function OutputArea({outputMessages}) {
    return (
        <div className="output-area">
            {outputMessages.map((message, index) => (
                <div className="output-message">
                    <p key={index}>{message}</p>
                </div>
            ))}
        </div>
    );
}

function helpCommand() {
    return (
        <div>
            <h3>Command List</h3>
            <ul>
                <li><code>clear</code> - Clears the screen</li>
                <li><code>exit</code> - Attempt to escape</li>
                <li><code>help</code> - Displays this help message</li>
                <li><code>google</code> - Open Google in an <code>iframe</code></li>
            </ul>
        </div>
    );
}

function WebFrame(specifiedUrl, title) {
    return (
        <div>
            <iframe
                src={specifiedUrl}
                title={title}
                width="100%"
                height="500px"
            />
            <p>Please be aware that not everything can be displayed in an <code>iframe</code>.</p>
        </div>
    );
}

export function handleCommandSubmit(command, outputMessages) {
    const commandToMatch = command.toLowerCase();
    if (commandToMatch === "") {
        return outputMessages;
    }
    else if (commandToMatch === "clear") {
        return [];
    }
    else if (commandToMatch === "welcome") {
        const welcomeMessage = (
            <div>
                <h3>Welcome to Webbous!</h3>
                <PowerOnSelfTest />
                <p>The Command Prompt is available at the bottom of the screen, type <code>help</code> for a list of commands.</p>
            </div>
        );
        return [welcomeMessage];
    }
    else if (commandToMatch === "help") {
        const helpText = helpCommand();
        return [...outputMessages, helpText];
    }
    else if (commandToMatch === "exit") {
        return [...outputMessages, "You can't exit from the Web!"];
    }
    else if (commandToMatch === "google") {
        const page = (
            <div>
                <h3>Google</h3>
                { WebFrame("https://www.google.com/search?igu=1", "Google") }
            </div>
        );
        return [...outputMessages, page];
    }
    else {
        const newOutputMessage = `Unknown command: ${command}`;
        return [...outputMessages, newOutputMessage];
    }
}
