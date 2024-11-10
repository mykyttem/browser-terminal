import React, { useState, useEffect } from 'react';
import '../styles/BodyTerminal.css';
import { HandlerClear } from './handlers/HandlerCommands';
import { removeAnsiCodes } from './Utils';
import useWebSocket from './hooks/UseWebSocket';

const BodyTerminal = ({ theme }) => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState([]);
    const [currentDir, setCurrentDir] = useState('/');
    const { sendMessage, isConnected } = useWebSocket('ws://localhost:8080/ws', setOutput);

    // Perform the action after the connection is established
    useEffect(() => {
        if (isConnected) {
            setOutput((prevOutput) => [...prevOutput, 'Connection established with the server.']);
        } else {
            setOutput((prevOutput) => [...prevOutput, 'Connection lost. Please try reconnecting.']);
        }
    }, [isConnected]);

    // Update current directory
    useEffect(() => {
        const lastOutput = output[output.length - 1];
        if (lastOutput && lastOutput.includes('currentDir:')) {
            setCurrentDir(lastOutput.replace('currentDir:', '').trim());
        }
    }, [output]);

    const handleSubmit = (e) => {
        e.preventDefault();
        HandlerClear(e, input, setInput, setOutput);
        // Sending a command via WebSocket
        if (input.trim() !== '') {
            sendMessage(input);
            setOutput((prevOutput) => [...prevOutput, `$ ${input}`]);
            setInput('');
        }
    };

    // Clean up ANSI codes before displaying
    const cleanedOutput = output.map(removeAnsiCodes);

    return (
        <div className={`terminal ${theme}`}>
            <div className="output" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {cleanedOutput.map((line, index) => (
                    <div key={index} style={{ whiteSpace: 'pre-wrap' }}>{line}</div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="input-area">
                <span>{`${currentDir} $`}</span>
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