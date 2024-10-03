interface Task {
    id: number;
    taskText: string;
    isCompleted: boolean;
    isNew: boolean;
}

export const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
    document.getElementById('bootom-dark')?.classList.toggle('dark-mode-bottom');
};



export const loadTasksCount = (tasksToCount: Task[]) => {
    const itemsLeft = document.getElementById('items-left');
    const count = tasksToCount.filter(task => !task.isCompleted).length;
    if (itemsLeft) {
        itemsLeft.innerHTML = `${count} items left`;
    }
};

export const saveTasksToLocalStorage = (tasks: Task[]) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasksCount(tasks);

    }
};

export const loadTasksFromLocalStorage = (setTasks: (tasks: Task[]) => void) => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
    } else {
        localStorage.setItem('tasks', JSON.stringify([]));
    }
    loadTasksCount(savedTasks ? JSON.parse(savedTasks) : []);
};

export const handleFocusIn = (e: FocusEvent) => {
    if ((e.target as HTMLElement).classList.contains('task-input')) {
        const taskDiv = (e.target as HTMLElement).closest('.task');
        if (taskDiv) {
            (taskDiv as HTMLElement).style.backgroundColor = '#00000017';
        }
    }
};

export const handleFocusOut = (e: FocusEvent) => {
    if ((e.target as HTMLElement).classList.contains('task-input')) {
        const taskDiv = (e.target as HTMLElement).closest('.task');
        if (taskDiv) {
            (taskDiv as HTMLElement).style.backgroundColor = '';
        }
    }
};

export const handleTaskDragStart = (task: Task, setDraggingTask: (task: Task | null) => void) => {
    setDraggingTask(task);
};

export const handleTaskDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
};

export const handleTaskDrop = (index: number, setTasks: (tasks: Task[]) => void, setDraggingTask: (task: Task | null) => void, draggingTask: Task | null, tasks: Task[]) => {
    if (draggingTask === null) return;

    const updatedTasks = [...tasks];
    const draggingTaskIndex = updatedTasks.indexOf(draggingTask);

    updatedTasks.splice(draggingTaskIndex, 1);
    updatedTasks.splice(index, 0, draggingTask);

    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
    setDraggingTask(null);
};

export const handleTaskDragEnd = (setDraggingTask: (task: Task | null) => void) => {
    setDraggingTask(null);
};

export const addTask = (
    taskText: string,
    isCompleted: boolean = false,
    setTasks: (tasks: Task[]) => void,
    tasks: Task[],
) => {
    const newTask = { id: Date.now(), taskText, isCompleted, isNew: true };
    const updatedTasks = [newTask, ...tasks];
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
    loadTasksCount(updatedTasks);

    setTimeout(() => {

        const tasksWithoutIsNew = updatedTasks.map(task => ({
            ...task,
            isNew: false
        }));
        setTasks(tasksWithoutIsNew);
        saveTasksToLocalStorage(tasksWithoutIsNew);
    }, 700);
};


export const handleCheckboxChange = (index: number, tasks: Task[], setTasks: (tasks: Task[]) => void) => {
    const updatedTasks = tasks.map((task, i) =>
        i === index ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
};

export const handleTaskInputBlur = (index: number, taskText: string, tasks: Task[], setTasks: (tasks: Task[]) => void) => {
    const updatedTasks = tasks.map((task, i) =>
        i === index ? { ...task, taskText } : task
    );
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
};

export const removeTask = (index: number, tasks: Task[], setTasks: (tasks: Task[]) => void) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
};

export const clearCompletedTasks = (tasks: Task[], setTasks: (tasks: Task[]) => void) => {
    const updatedTasks = tasks.filter(task => !task.isCompleted);
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
};


