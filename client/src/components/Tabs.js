import React from 'react';
import '../styles/Tabs.css';

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
    return (
        <div className="tabs">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    className={`tab ${activeTab === tab ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};

export default Tabs;