import React from 'react';
import '../styles/Settings.css';

const Settings = ({ setTheme }) => {
    const handleDarkMode = () => {
        setTheme('dark');
    };

    const handleLightMode = () => {
        setTheme('light');
    };

    const handleBlueMode = () => {
        setTheme('blue');
    };

    const handleRedMode = () => {
        setTheme('red');
    };

    const handleGreenMode = () => {
        setTheme('green');
    };

    return (
        <div className="settings">
            <h2>Settings</h2>
            <p>Choose your terminal theme:</p>
            <div className="button-group">
                <button className="button" onClick={handleDarkMode}>Dark Mode</button>
                <button className="button" onClick={handleLightMode}>Light Mode</button>
                <button className="button" onClick={handleBlueMode}>Blue Mode</button>
                <button className="button" onClick={handleRedMode}>Red Mode</button>
                <button className="button" onClick={handleGreenMode}>Green Mode</button>
            </div>
        </div>
    );
};


export default Settings;