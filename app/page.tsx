"use client";

import React, { useEffect, useState } from 'react';
import { handleFocusIn, handleFocusOut, addTask } from './utils/taskUtils';
import TodoInput from './components/TodoInput/TodoInput';
import TaskList from './components/TaskList';
import HeaderSection from './components/HeaderSections/HeaderSection';
import SortMobile from './components/SortMobile';
import './styles/global.css';

interface Task {
  id: number;
  taskText: string;
  isCompleted: boolean;
  isNew: boolean;
}

const TodoApp = () => {
  // const [isDarkMode, setIsDarkMode] = useState(false);
  
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');


  useEffect(() => {
    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);

  }, []);

  return (
    <>
      <div className="bacground-section"></div>
      <div className="main-section">
        <HeaderSection />
        <TodoInput
          newTaskText={newTaskText}
          setNewTaskText={setNewTaskText}
          handleKeyUp={() => addTask(newTaskText, false, setTasks, tasks)}
        />
        <TaskList tasks={tasks} setTasks={setTasks} activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        <SortMobile activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
      </div>
    </>
  );
};

export default TodoApp;