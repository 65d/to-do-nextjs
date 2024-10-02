import { toggleDarkMode } from "../utils/taskUtils";

const HeaderSection = () => {
    return (
        <div className="header-section">
            <div className="header-todo">Todo</div>
            <div id="toggleDarkMode" className="apirience-icon" onClick={toggleDarkMode}></div>
        </div>
    );
};

export default HeaderSection;