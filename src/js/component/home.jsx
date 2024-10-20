import React, { useState } from "react";
import '../../styles/index.css'; 

const Home = () => {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null); // 

    const handleInputChange = (event) => {
        setTask(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && task.trim()) {
            setTasks([...tasks, task.trim()]);
            setTask(""); // Limpiar el input después de agregar la tarea
        }
    };

    const handleDeleteTask = (index) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
    };

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
            </div>
            <ul className="list-group">
                {tasks.length > 0 ? (
                    tasks.map((task, index) => (
                        <li 
                            key={index} 
                            className="list-group-item d-flex justify-content-between align-items-center"
                            onMouseEnter={() => setHoveredIndex(index)} // Mostrar ícono en hover
                            onMouseLeave={() => setHoveredIndex(null)} // Ocultar ícono al salir
                        >
                            {task}
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
