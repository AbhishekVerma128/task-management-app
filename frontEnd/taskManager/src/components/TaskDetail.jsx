import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TaskDetail = ({ getTaskDetail }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const getTaskDetails = async()=>{
        const data = await getTaskDetail(id)
        if(data){
            setTask(data);
            
        }
    }

    useEffect(() => {
        if (id) {
            getTaskDetails()
        }

    }), []


    // Fetch task details when the component mounts
    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/tasks/${id}`);
                setTask(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching task:', error);
                setError('Failed to fetch task details');
                setLoading(false);
            }
        };

        fetchTask();
    }, [id]);

    // Handle loading state
    if (loading) {
        return <div className="text-center mt-4">Loading...</div>;
    }

    // Handle error state
    if (error) {
        return <div className="text-center mt-4 text-danger">{error}</div>;
    }

    // Handle case where task is not found
    if (!task) {
        return <div className="text-center mt-4">Task not found</div>;
    }

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{task.title}</h5>
                    <p className="card-text">{task.description}</p>
                    <p className="card-text">
                        <strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                    <p className="card-text">
                        <strong>Priority:</strong>{" "}
                        <span
                            className={`badge ${task.priority === "High"
                                ? "bg-danger"
                                : task.priority === "Medium"
                                    ? "bg-warning"
                                    : "bg-success"
                                }`}
                        >
                            {task.priority}
                        </span>
                    </p>
                    <p className="card-text">
                        <strong>Status:</strong>{" "}
                        <span
                            className={`badge ${task.status === "Completed" ? "bg-success" : "bg-secondary"
                                }`}
                        >
                            {task.status}
                        </span>
                    </p>
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate('/')} // Navigate back to the task list
                    >
                        Back to Task List
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskDetail;