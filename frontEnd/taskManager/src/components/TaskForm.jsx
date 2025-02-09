import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TaskForm = ({ addTask, item, header, updateTask }) => {
    const navigate = useNavigate()
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('Low');
    useEffect(() => {
        if (item) {

            setTitle(item.title);
            setDescription(item.description);
            setDueDate(item.dueDate.slice(0, 10));
            setPriority(item.priority)
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (item) {

            updateTask(item._id, { title, description, dueDate, priority }, navigate)
        } else {
            addTask({ title, description, dueDate, priority });
        }
        setTitle('');
        setDescription('');
        setDueDate('');
        setPriority('Low');
    };

    return (
        <div className='container'>
            <h2 className="card-title mb-5">{header}</h2>
            <div className="card">
                <div className="card-body">

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <textarea
                                className="form-control"
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="date"
                                className="form-control"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <select
                                className="form-select"
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">{item ? "Update" : "Add Task"}</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TaskForm;