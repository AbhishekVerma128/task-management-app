const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    dueDate: Date,
    priority: String,
    status: { type: String, default: 'Pending' },
});
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;