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
                <button className="button" onClick={handleDarkMode}><span style={{ backgroundColor: '#1e1e1e' }}></span>Dark Mode</button>
                <button className="button" onClick={handleLightMode}><span style={{ backgroundColor: '#f1f1f1' }}></span>Light Mode</button>
                <button className="button" onClick={handleBlueMode}><span style={{ backgroundColor: '#0000ff' }}></span>Blue Mode</button>
                <button className="button" onClick={handleRedMode}><span style={{ backgroundColor: '#ff0000' }}></span>Red Mode</button>
                <button className="button" onClick={handleGreenMode}><span style={{ backgroundColor: '#00ff00' }}></span>Green Mode</button>
            </div>
        </div>
    );
};


export default Settings;