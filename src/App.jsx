import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/todos/')
            .then(response => setTodos(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>My Todo List</h1>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        {todo.title} - {todo.completed ? 'Completed' : 'Pending'}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;