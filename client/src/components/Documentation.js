import React from 'react';
import '../styles/Documentation.css';

const Documentation = () => {
    const tips = [
        "You can search for terminal commands on the internet to learn new ways to interact with your system.",
        "Use 'man [command]' to get a detailed manual for any Linux command.",
        "Use 'history' to see the list of previously used commands.",
        "You can press 'Tab' to auto-complete commands or file names."
    ];

    const fileCommands = [
        { command: 'ls', description: 'List files and directories' },
        { command: 'cd', description: 'Change directory' },
        { command: 'pwd', description: 'Print current working directory' },
        { command: 'mkdir', description: 'Create a new directory' },
        { command: 'rm', description: 'Remove a file or directory' },
        { command: 'cp', description: 'Copy files or directories' },
        { command: 'mv', description: 'Move or rename files or directories' },
        { command: 'cat', description: 'Concatenate and display file content' },
        { command: 'nano', description: 'Edit files with nano text editor' },
    ];

    return (
        <div className="documentation">            
            <section>
                <h3>Tips for Linux Beginners</h3>
                <ul>
                    {tips.map((tip, index) => (
                        <li key={index}>{tip}</li>
                    ))}
                </ul>
            </section>

            <section>
                <h3>Basic File Manipulation Commands</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Command</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fileCommands.map((cmd, index) => (
                            <tr key={index}>
                                <td><code>{cmd.command}</code></td>
                                <td>{cmd.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
};


export default Documentation;