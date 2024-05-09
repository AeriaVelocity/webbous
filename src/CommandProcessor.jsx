/* Command Processor... for Webbous */

import React from "react";

export function CommandPrompt({onCommandSubmit}) {
    const [command, setCommand] = React.useState("");

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
            <span>$</span>{" "}
            <input type="text" value={command} onChange={handleChange} autoFocus />
        </form>
    );
}

export function OutputArea({outputMessages}) {
    return (
        <div className="output-area">
            <div className="output-message">
                <p>Welcome to Webbous!</p>
                <p>The Command Prompt is available at the bottom of the screen.</p>
            </div>
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
            <h4>Command List</h4>
            <ul>
                <li><code>clear</code> - Clear the output area</li>
                <li><code>help</code> - Display this help message</li>
                <li><code>exit</code> - Exit the Web</li>
            </ul>
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
    else if (commandToMatch === "help") {
        const helpText = helpCommand();
        return [...outputMessages, helpText];
    }
    else if (commandToMatch === "exit") {
        return [...outputMessages, "You can't exit from the Web!"];
    }
    else if (commandToMatch === "www") {
        const page = (
            <div>
                <h3>Web iframe</h3>
                <iframe
                    src="https://google.com/search?igu=1"
                    title="Search"
                    width="100%"
                    height="400px"
                />
                <p>Please be aware that not everything can be displayed in an <code>iframe</code>.</p>
            </div>
        );
        return [...outputMessages, page];
    }
    else {
        const newOutputMessage = `Unknown command: ${command}`;
        return [...outputMessages, newOutputMessage];
    }
}
