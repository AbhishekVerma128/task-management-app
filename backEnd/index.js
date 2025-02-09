const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

const connectDB = require('./connection/conn');
connectDB();

const Task = require('./models/taskModel');
// Middleware
app.use(cors());
app.use(bodyParser.json());

// POST  Create a new task
app.post('/tasks', async (req, res) => {
    try {
        const { title, description, dueDate, priority } = req.body;
        if (!title) {
            return res.status(400).json({ error: 'Title is required' });
        }
        const newTask = new Task({ title, description, dueDate, priority });
        await newTask.save();
        res.status(201).json({message: 'Task created successfully',newTask});
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Failed to create task' });
    }
});

// GET all tasks
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

// Task detail
app.get('/tasks/:id', async (req, res) => {
    
    const task = await Task.findById(req.params.id);
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    res.json({message: 'success',task});
});

// PUT 
app.put('/tasks/:id', async (req, res) => {
    try {
        const { title, description, dueDate, priority,status} = req.body;

        // Validate required fields
        if (!title) {
            return res.status(400).json({ error: 'Title is required' });
        }

        // Find and update the task
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { title, description, dueDate, priority,status},
            { new: true }
        );
        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json({message: 'Task updated successfully',updatedTask});
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'Failed to update task' });
    }
});

// DELETE
app.delete('/tasks/:id', async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);

        // Check if the task exists
        if (!deletedTask) {
            return res.status(204).json({ error: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: 'Failed to delete task' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});