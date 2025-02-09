import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TaskList = ({ tasks, updateTask, deleteTask }) => {
    const navigation = useNavigate();
    const [filterPriority, setFilterPriority] = useState('All'); // State for priority filter
    const [filterStatus, setFilterStatus] = useState('All');
    const [filteredTasks, setFilteredTasks] = useState([]);

    useEffect(() => {
        if(filterPriority=="All" && filterStatus=="All"){
            setFilteredTasks(tasks)
        }else{
           
            setFilteredTasks(tasks.filter(task => {
                const matchesPriority = filterPriority === 'All' || task.priority === filterPriority;
                const matchesStatus = filterStatus === 'All' || task.status === filterStatus;
                return matchesPriority && matchesStatus;
            }))
        }
       

    }, [filterPriority,filterStatus,tasks])

    return (
        <div>
            <div className="mb-4">
                <label className="me-2">
                    Filter by Priority:
                    <select
                        className="form-select ms-2"
                        value={filterPriority}
                        onChange={(e) => setFilterPriority(e.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </label>

                <label className="ms-4 me-2">
                    Filter by Status:
                    <select
                        className="form-select ms-2"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                    </select>
                </label>
            </div>
            {filteredTasks.map(task => (
                <div key={task._id} className="card mb-3">
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <h5 className="card-title" onClick={() => navigation(`/task/detail/${task._id}`)}>{task.title}</h5>
                            <button onClick={() => navigation("/task/edit", { state: { task } })}>Edit</button>
                        </div>
                        <p className="card-text">{task.description}</p>
                        <p className="card-text">
                            <small className="text-muted">Due: {new Date(task.dueDate).toLocaleDateString()}</small>
                        </p>
                        <p className="card-text">
                            Priority: <span className={`badge ${task.priority === 'High' ? 'bg-danger' : task.priority === 'Medium' ? 'bg-warning' : 'bg-success'}`}>
                                {task.priority}
                            </span>
                        </p>
                        <p className="card-text">
                            Status: <span className={`badge ${task.status === 'Pending' ? 'bg-info' : 'bg-success'}`}>
                                {task.status}
                            </span>
                        </p>
                        <button
                            className="btn btn-success me-2"
                            onClick={() => updateTask(task._id, { ...task, status: 'Completed' })}
                        >
                            Complete
                        </button>
                        <button
                            className="btn btn-danger"
                            onClick={() => deleteTask(task._id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskList;