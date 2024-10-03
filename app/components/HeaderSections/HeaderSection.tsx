"use client"
import { toggleDarkMode } from "../../utils/taskUtils";
import styles from './HeaderSection.module.css';
import { useState, useEffect } from 'react';



const HeaderSection = () => {

    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const darkModeEnabled = localStorage.getItem('isDarkMode') === 'true';
        setIsDarkMode(darkModeEnabled);

        if(darkModeEnabled){
            handleToggle();
        }
        
    }, []);

    const handleToggle = () => {
        toggleDarkMode();
        const newDarkModeState = !isDarkMode;
        setIsDarkMode(newDarkModeState);
        localStorage.setItem('isDarkMode', newDarkModeState.toString());
    };

    return (
        <div className={styles.headerSection}>
            <div className={styles.headerTodo}>Todo</div>
            <div id="toggleDarkMode" className={`${styles.apirienceIcon} ${isDarkMode ? styles.darkModeIcon : styles.lightModeIcon}`} onClick={handleToggle}></div>
        </div>  
    );
};

export default HeaderSection;