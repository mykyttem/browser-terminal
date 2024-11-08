import React, { useState } from 'react';
import '../styles/BodyTerminal.css';
import { HandlerClear } from './handlers/HandlerCommands';

const BodyTerminal = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState([]);

    const handleSubmit = (e) => {
        HandlerClear(e, input, setInput, setOutput);
    };

    return (
        <div className="terminal">
            <div className="output">
                {output.map((line, index) => (
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