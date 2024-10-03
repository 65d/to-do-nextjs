"use client";

import React, { useState, useEffect } from 'react';
import BottomSection from './BottomSection/BottomSection';
import { loadTasksCount } from '../utils/taskUtils';
import { loadTasksFromLocalStorage, handleTaskDragStart, handleTaskDragOver, handleTaskDrop, handleTaskDragEnd, handleCheckboxChange, handleTaskInputBlur, removeTask, clearCompletedTasks } from '../utils/taskUtils';
interface Task {
  id: number;
  taskText: string;
  isCompleted: boolean;
  isNew: boolean;
}

interface TaskListProps {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, setTasks, activeFilter, setActiveFilter }) => {
  const [draggingTask, setDraggingTask] = useState(null);

  const filteredTasks = tasks.filter(task => {
    if (activeFilter === 'active') return !task.isCompleted;
    if (activeFilter === 'completed') return task.isCompleted;
    return true;
  });

  useEffect(() => {
    loadTasksFromLocalStorage(setTasks);
  }, [setTasks]);

  return (
    <div className="items-section">
      <div id="items" className="items">
        {filteredTasks.map((task, index) => (
          <div
            className={`task ${task.isCompleted ? 'completed' : ''} ${task.isNew ? 'new-task' : ''}`}
            key={task.id}
            draggable
            onDragStart={() => handleTaskDragStart(task, setDraggingTask as (task: Task | null) => void)}
            onDragOver={(e: React.DragEvent<HTMLDivElement>) => handleTaskDragOver(e)}
            onDrop={() => handleTaskDrop(index, setTasks, setDraggingTask as (task: Task | null) => void, draggingTask, tasks)}
            onDragEnd={() => handleTaskDragEnd(setDraggingTask as (task: Task | null) => void)}
          >
            <div className="edit-part">
              <label className="chekbox-t">
                <input
                  type="checkbox"
                  checked={task.isCompleted}
                  onChange={() => handleCheckboxChange(index, tasks, setTasks)}
                />
                <span className="checkmark"></span>
              </label>
              <input
                className="task-input"
                type="text"
                value={task.taskText}
                onChange={(e) => handleTaskInputBlur(index, e.target.value, tasks, setTasks)}
                onClick={(e) => (e.target as HTMLInputElement).removeAttribute('readonly')}
                onBlur={(e) => handleTaskInputBlur(index, e.target.value, tasks, setTasks)}
                onKeyUp={(e) => e.key === 'Enter' && handleTaskInputBlur(index, (e.target as HTMLInputElement).value, tasks, setTasks)}
              />
            </div>
            <div className="close-icon" onClick={() => removeTask(index, tasks, setTasks)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-x"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 1 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      <BottomSection
        setActiveFilter={setActiveFilter}
        clearCompletedTasks={() => clearCompletedTasks(tasks, setTasks)}
        activeFilter={activeFilter}
        filteredTasks={filteredTasks}
        loadTasksCount={loadTasksCount}
      />

    </div>
  );
};

export default TaskList;