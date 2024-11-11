import React, { useState } from 'react';
import BodyTerminal from './cmd/BodyTerminal';
import Tabs from './components/tabs/Tabs';
import Settings from './components/Settings';
import TaskList from './components/Labs';
import Documentation from './components/Documentation';
import './styles/App.css';

function App() {
  const [activeTab, setActiveTab] = useState('Terminal');
  const [theme, setTheme] = useState('dark');
  const tabs = ['Terminal', 'Labs', 'Settings', 'Documentation', 'More'];

  const renderContent = () => {
    switch (activeTab) {
      case 'Terminal':
        return <BodyTerminal theme={theme} />;
      case 'Labs':
        return <TaskList setTheme={setTheme} />;
      case 'Settings':
        return <Settings setTheme={setTheme} />;
      case 'Documentation':
        return <Documentation setTheme={setTheme} />;
      default:
        return null;
    }
  };

  return (
    <div className={`App ${theme}`}>
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      {renderContent()}
    </div>
  );
}


export default App;