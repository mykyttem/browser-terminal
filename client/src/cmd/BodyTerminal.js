import React, { useState } from 'react';
import '../styles/BodyTerminal.css';
import { HandlerClear } from './handlers/HandlerCommands';
import { removeAnsiCodes } from './Utils';
import useWebSocket from './hooks/UseWebSocket';

const BodyTerminal = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState([]);
    const { sendMessage } = useWebSocket('ws://localhost:8080/ws', setOutput);

    // processing the entered command
    const handleSubmit = (e) => {
        e.preventDefault();
        HandlerClear(e, input, setInput, setOutput);
        // sending a command via WebSocket
        if (input.trim() !== '') {
            sendMessage(input);
            setOutput((prevOutput) => [...prevOutput, `$ ${input}`]);
            setInput('');
        }
    };

    // clean up ANSI codes before displaying
    const cleanedOutput = output.map(removeAnsiCodes);

    return (
        <div className="terminal">
            <div className="output">
                {cleanedOutput.map((line, index) => (
                    <div key={index}>{line}</div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="input-area">
                <span>$ </span>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="input"
                    autoFocus
                />
            </form>
        </div>
    );
};

export default BodyTerminal;