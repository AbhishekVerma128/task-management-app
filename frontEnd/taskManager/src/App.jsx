import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Dashboard from './components/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditTask from './components/EditTask';
import { ToastContainer, toast } from 'react-toastify';
import TaskDetail from './components/TaskDetail';
import Loader from './components/Loader';
const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get('https://task-management-app-udv5.onrender.com/tasks');
    setTasks(response.data);
    setLoading(false)
  };

  const addTask = async (task) => {
    const response = await axios.post('https://task-management-app-udv5.onrender.com/tasks', task);
    if (response.data.message) {
      toast(response.data.message, { type: "success" })
      setTasks([...tasks, response.data.newTask]);
    } else {
      toast(response.data.error, { type: "error" })
    }
  };

  const updateTask = async (id, updatedTask, navigate) => {
    const response = await axios.put(`https://task-management-app-udv5.onrender.com/tasks/${id}`, updatedTask);
    if (response.data.message) {
      toast(response.data.message, { type: "success" })
      setTasks(tasks.map(task => (task._id === id ? response.data.updatedTask : task)));
      navigate("/")
    } else {
      toast(response.data.error, { type: "error" })
    }

  };
  const getTaskDetail = async (id) => {
    const response = await axios.get(`https://task-management-app-udv5.onrender.com/tasks/${id}`);
    if (response.data.message) {
      return response.data.task
    } else {
      toast(response.data.error, { type: "error" })
    }

  };

  const deleteTask = async (id) => {
    const response = await axios.delete(`https://task-management-app-udv5.onrender.com/tasks/${id}`);
    if (response.data.message) {
      toast(response.data.message, { type: "success" })
      setTasks(tasks.filter(task => task._id !== id));
    } else {
      toast(response.data.error, { type: "error" })
    }

  };

  return (
    <Router>
      <div >
        <>
          <div className="collapse navbar-collapse" id="navbarNav"></div>
          <Navbar />
        </>
        <ToastContainer />
        {loading && <Loader/>}
        <div className="container mt-4">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <h1 className="text-center mb-4">Task List</h1>
                  <TaskList tasks={tasks} deleteTask={deleteTask} updateTask={updateTask} />
                </>
              }
            />
            <Route
              path="/task/detail/:id"
              element={
                <>
                  <h1 className="text-center mb-4">Task Detail</h1>
                  <TaskDetail getTaskDetail={getTaskDetail} />
                </>
              }
            />
            <Route
              path="/task/create"
              element={
                <>
                  <TaskForm addTask={addTask} header={"Add New Task"} />
                </>
              }
            />
            <Route
              path="/task/edit"
              element={
                <>
                  <EditTask updateTask={updateTask} />
                </>
              }
            />
            <Route
              path="/dashboard"
              element={
                <>
                  <Dashboard tasks={tasks} />
                </>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;