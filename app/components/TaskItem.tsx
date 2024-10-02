"use client";

import React from 'react';

interface TodoInputProps {
  newTaskText: string;
  setNewTaskText: (text: string) => void;
  handleKeyUp: (taskText: string) => void;
}


const TodoInput: React.FC<TodoInputProps> = ({ newTaskText, setNewTaskText, handleKeyUp }) => {
  return (
    <div className="create-new-task">
      <label style={{ pointerEvents: "none" }} className="chekbox-t">
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
        onKeyUp={(e) => e.key === 'Enter' && handleKeyUp(newTaskText)}
      />
    </div>
  );
};

export default TodoInput;