import React, { useState, useEffect } from "react";
import '../../styles/index.css'; 

const Home = () => {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null); 

    // Cargar tareas desde la API al inicio
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch('https://playground.4geeks.com/todo/user/alesanchezr');
                const data = await response.json();
                // Verifica si data es un array
                if (Array.isArray(data)) {
                    setTasks(data);
                } else {
                    console.error("Formato de datos inesperado:", data);
                }
            } catch (error) {
                console.error("Error al cargar las tareas:", error);
            }
        };

        fetchTasks();
    }, []);

    // Sincronizar tareas con el servidor
    const updateTasksOnServer = async (todos) => {
        try {
            const response = await fetch('https://playground.4geeks.com/todo/user/alesanchezr', {
                method: "PUT",
                body: JSON.stringify(todos),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            console.log(data); // Verifica la respuesta del servidor
        } catch (error) {
            console.error("Error al actualizar las tareas en el servidor:", error);
        }
    };

    const handleInputChange = (event) => {
        setTask(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && task.trim()) {
            const newTask = { label: task.trim(), done: false };
            const newTasks = [...tasks, newTask];
            setTasks(newTasks);
            setTask(""); 
        }
    };

    const handleDeleteTask = (index) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
    };

    const handleClearTasks = () => {
        setTasks([]);
    };

    // Sincroniza las tareas con el servidor cada vez que cambian
    useEffect(() => {
        updateTasksOnServer(tasks);
    }, [tasks]);

    return (
        <div className="container mt-4">
            <h1 className="text-center">To Do List</h1>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Añadir nueva tarea"
                    value={task}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
                <button className="btn btn-danger" onClick={handleClearTasks}>
                    Limpiar Tareas
                </button>
            </div>
            <ul className="list-group">
                {tasks.length > 0 ? (
                    tasks.map((task, index) => (
                        <li 
                            key={index} 
                            className="list-group-item d-flex justify-content-between align-items-center"
                            onMouseEnter={() => setHoveredIndex(index)} 
                            onMouseLeave={() => setHoveredIndex(null)} 
                        >
                            {task.label}
                            {hoveredIndex === index && (
                                <span
                                    className="delete-icon"
                                    onClick={() => handleDeleteTask(index)}
                                    style={{ cursor: 'pointer', color: 'red' }}
                                >
                                    &times; {/* Ícono de eliminar */}
                                </span>
                            )}
                        </li>
                    ))
                ) : (
                    <li className="list-group-item text-center">No hay tareas, añadir tareas</li>
                )}
            </ul>
            <p className="text-center m-5">
                Made by{" "}
                <a href="https://github.com/soycamaral">soyCamaral</a>, with
                love!
            </p>
        </div>
    );
};

export default Home;

