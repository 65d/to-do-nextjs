"use client";

import React from 'react';

interface Task {
  id: number;
  taskText: string;
  isCompleted: boolean;
  isNew: boolean;
}

interface BottomSectionProps {
  setActiveFilter: (filter: string) => void;
  clearCompletedTasks: () => void;
  activeFilter: string;
  filteredTasks: Task[]; 
  loadTasksCount: (tasksToCount: Task[]) => void; 
}

const BottomSection: React.FC<BottomSectionProps> = ({ setActiveFilter, clearCompletedTasks, activeFilter }) => {
  return (
    <div className="bottom-section">
      <div id="items-left" className="items-left">
      </div>

      <div className="sort-items">
        <div
          id="button-all"
          className={`sort-option ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          All
        </div>
        <div
          id="button-active"
          className={`sort-option ${activeFilter === 'active' ? 'active' : ''}`}
          onClick={() => setActiveFilter('active')}
        >
          Active
        </div>
        <div
          id="button-completed"
          className={`sort-option ${activeFilter === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveFilter('completed')}
        >
          Completed
        </div>
      </div>

      <div id="clear-done" className="clear-completed" onClick={clearCompletedTasks}>
        Clear Completed
      </div>
    </div>
  );
};

export default BottomSection;


