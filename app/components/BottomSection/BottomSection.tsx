"use client";

import React from 'react';
import styles from './BottomSection.module.css';
import { useState, useEffect } from 'react';

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
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    const darkModeEnabled = localStorage.getItem('isDarkMode') === 'true';
    setIsDarkMode(darkModeEnabled);
}, [isDarkMode]);

  useEffect(() => {
      // Fetch dark mode status from localStorage on mount
      const darkModeEnabled = localStorage.getItem('isDarkMode') === 'true';
      setIsDarkMode(darkModeEnabled);

      // Listen for localStorage changes
      const storageListener = () => {
          const darkModeEnabled = localStorage.getItem('isDarkMode') === 'true';
          setIsDarkMode(darkModeEnabled);
      };

      window.addEventListener('storage', storageListener);

      return () => {
          window.removeEventListener('storage', storageListener);
      };
  }, []);


  return (
    <div id='bootom-dark' className={`${styles.bottomSection} `}>
     <div id="items-left" className={styles.itemsLeft}>
      </div>

      <div className={styles.sortItems}>
        <div
          id="button-all"
          className={`${styles.sortOption} ${activeFilter === 'all' ? styles.active : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          All
        </div>
        <div
          id="button-active"
            className={`${styles.sortOption} ${activeFilter === 'active' ? styles.active : ''}`}
          onClick={() => setActiveFilter('active')}
        >
          Active
        </div>
        <div
          id="button-completed"
          className={`${styles.sortOption} ${activeFilter === 'completed' ? styles.active : ''}`}
          onClick={() => setActiveFilter('completed')}
        >
          Completed
        </div>
      </div>

      <div id="clear-done" className={styles.clearCompleted} onClick={clearCompletedTasks}>
        Clear Completed
      </div>
    </div>
  );
};

export default BottomSection;


