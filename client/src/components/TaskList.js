import React, { useState } from 'react';
import '../styles/TaskList.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Install Node.js', description: 'Download and install Node.js for project setup.', completed: false, priority: 'high' },
    { id: 2, title: 'Initialize Project', description: 'Run `npm init` to create a package.json file.', completed: true, priority: 'low' },
    { id: 3, title: 'Install Dependencies', description: 'Install React and other dependencies using `npm install`.', completed: false, priority: 'medium' },
  ]);

  const handleTaskClick = (id) => {
    console.log(`Task ${id} clicked!`);
  };

  return (
    <div className="tasks">
      <div className="task-column">
        <h3>Low Priority</h3>
        {tasks.filter(task => task.priority === 'low').map(task => (
          <div 
            key={task.id} 
            className={`task low-priority ${task.completed ? 'completed' : ''}`} 
            onClick={() => handleTaskClick(task.id)}
          >
            <h3>{task.title}</h3>
            <p>{task.description}</p>
          </div>
        ))}
      </div>

      <div className="task-column">
        <h3>Medium Priority</h3>
        {tasks.filter(task => task.priority === 'medium').map(task => (
          <div 
            key={task.id} 
            className={`task medium-priority ${task.completed ? 'completed' : ''}`} 
            onClick={() => handleTaskClick(task.id)}
          >
            <h3>{task.title}</h3>
            <p>{task.description}</p>
          </div>
        ))}
      </div>

      <div className="task-column">
        <h3>High Priority</h3>
        {tasks.filter(task => task.priority === 'high').map(task => (
          <div 
            key={task.id} 
            className={`task high-priority ${task.completed ? 'completed' : ''}`} 
            onClick={() => handleTaskClick(task.id)}
          >
            <h3>{task.title}</h3>
            <p>{task.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


export default TaskList;