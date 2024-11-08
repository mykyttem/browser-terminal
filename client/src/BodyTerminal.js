import React, { useState } from 'react';
import './styles/BodyTerminal.css';


const BodyTerminal = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState([]);

    const handleCommand = (e) => {
        e.preventDefault();
        if (input.trim() === '') return;

        // Add the input command to the output
        setOutput((prev) => [...prev, `> ${input}`]);

        // Check for specific commands
        if (input.trim().toLowerCase() === 'clear') {
            setOutput([]); // Clear the output
        } else {
            // Here, you can add actual command processing logic
            setOutput((prev) => [...prev, 'Command executed']);
        }

        setInput('');
    };

    return (
        <div className="terminal">
            <div className="output">
                {output.map((line, index) => (
                    <div key={index}>{line}</div>
                ))}
            </div>
            <form onSubmit={handleCommand} className="input-area">
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