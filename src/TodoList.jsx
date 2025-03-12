import { useState, useEffect } from "react";
import "./index.css";

export default function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [editIndex, setEditIndex] = useState(null);
    const [editText, setEditText] = useState("");
    const [editPriority, setEditPriority] = useState("Medium");
    const [filter, setFilter] = useState("all");
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("darkMode") === "true"
    );

    useEffect(() => {
        localStorage.setItem("darkMode", darkMode);
        document.body.className = darkMode ? "dark" : "light";
    }, [darkMode]);

    const addTask = () => {
        if (task.trim() === "") return;
        setTasks([...tasks, { text: task, priority, completed: false }]);
        setTask("");
        setPriority("Medium");
    };

    const removeTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    const toggleComplete = (index) => {
        setTasks(
            tasks.map((t, i) =>
                i === index ? { ...t, completed: !t.completed } : t
            )
        );
    };

    const startEdit = (index) => {
        setEditIndex(index);
        setEditText(tasks[index].text);
        setEditPriority(tasks[index].priority);
    };

    const saveEdit = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].text = editText;
        updatedTasks[index].priority = editPriority;
        setTasks(updatedTasks);
        setEditIndex(null);
    };

    const filterTasks = () => {
        if (filter === "completed") return tasks.filter((t) => t.completed);
        if (filter === "pending") return tasks.filter((t) => !t.completed);
        return tasks;
    };

    return (
        <div className="app-container">
            <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
            </button>
            <h2>Manage Your Tasks</h2>
            <div className="task-input-container">
                <input
                    type="text"
                    placeholder="Add a new task..."
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
                <select
                    className="priority-select"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
            </div>
            <button className="add-task-btn" onClick={addTask}>Add Task</button>
            <div className="filters">
                <button onClick={() => setFilter("all")}>All</button>
                <button onClick={() => setFilter("completed")}>Completed</button>
                <button onClick={() => setFilter("pending")}>Pending</button>
            </div>
            <ul className="task-list">
                {filterTasks().map((t, index) => (
                    <li key={index} className={`task-card ${t.completed ? "completed" : ""}`}>
                        <input type="checkbox" checked={t.completed} onChange={() => toggleComplete(index)} />
                        <div className="task-content">
                            <strong>{t.text}</strong>
                            <p className="task-priority">Priority: {t.priority}</p>
                        </div>
                        <div className="task-actions">
                            {editIndex === index ? (
                                <>
                                    <input
                                        type="text"
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                    />
                                    <select
                                        className="priority-select"
                                        value={editPriority}
                                        onChange={(e) => setEditPriority(e.target.value)}
                                    >
                                        <option value="High">High</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Low">Low</option>
                                    </select>
                                    <button onClick={() => saveEdit(index)}>Save</button>
                                </>
                            ) : (
                                <>
                                    <button className="edit-btn" onClick={() => startEdit(index)}>✏️</button>
                                    <button className="delete-btn" onClick={() => removeTask(index)}>🗑️</button>
                                </>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
