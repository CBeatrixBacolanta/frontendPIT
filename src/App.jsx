import React, { useEffect, useState } from 'react'; 
import axios from 'axios';

const App = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Optional: use .env file for easier config
    const baseURL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

    useEffect(() => {
        console.log('Fetching todos from:', `${baseURL}/api/todos/`);

        axios.get(`${baseURL}/api/todos/`)
            .then(response => {
                console.log('Todos fetched:', response.data);
                setTodos(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching todos:', error);
                setError("Failed to load todos");
                setLoading(false);
            });
    }, [baseURL]);

    return (
        <div>
            <h1>My Todo List</h1>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {!loading && todos.length === 0 && <p>No todos found.</p>}

            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        {todo.title} - {todo.completed ? '✅ Completed' : '❌ Pending'}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
