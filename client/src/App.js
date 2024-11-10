import React, { useState } from 'react';
import BodyTerminal from './cmd/BodyTerminal';
import Tabs from './components/tabs/Tabs';
import Settings from './components/Settings';
import TaskList from './components/Labs';
import './styles/App.css';

function App() {
  const [activeTab, setActiveTab] = useState('Terminal');
  const [theme, setTheme] = useState('dark');
  const tabs = ['Terminal', 'Labs', 'Settings', 'Documentation', 'More'];

  return (
    <div className={`App ${theme}`}>
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'Terminal' ? (
        <BodyTerminal theme={theme} />
      ) : activeTab === 'Labs' ? (
        <TaskList setTheme={setTheme}/>
      ) : (
        <Settings setTheme={setTheme} />
      )}
    </div>
  );
}


export default App;