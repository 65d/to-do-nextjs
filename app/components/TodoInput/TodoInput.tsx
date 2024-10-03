"use client";

import React from 'react';

interface TodoInputProps {
  newTaskText: string;
  setNewTaskText: (text: string) => void;
  handleKeyUp: (taskText: string) => void;
}



const TodoInput: React.FC<TodoInputProps> = ({ newTaskText, setNewTaskText, handleKeyUp }) => {
  const handleTaskAdd = (text: string) => {
    handleKeyUp(text);
    setNewTaskText('');
  };
  return (
    <div className="create-new-task">
      <label className="chekbox-t new-task-checkbox">
        <input type="checkbox" />
        <span className="checkmark" />
      </label>
      <input
        type="text"
        className="task-input-n"
        id="new-task-input"
        
        placeholder="Create a new task"
        value={newTaskText}
        onChange={(e) => setNewTaskText(e.target.value)}
        onKeyUp={(e) => e.key === 'Enter' && handleTaskAdd(newTaskText)}
      />
    </div>
  );
};

export default TodoInput;