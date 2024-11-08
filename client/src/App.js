import React, { useState } from 'react';
import BodyTerminal from './cmd/BodyTerminal';
import Tabs from './components/Tabs';
import './styles/App.css';

function App() {
  const [activeTab, setActiveTab] = useState('Terminal');
  const tabs = ['Terminal', 'Settings', 'Documentation', 'More'];

  return (
    <div className="App">
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <BodyTerminal />
    </div>
  );
}


export default App;