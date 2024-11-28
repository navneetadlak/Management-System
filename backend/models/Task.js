const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {type: String, required: true },
    description: {type: String},
    dueDate: {type: Date, required: true},
    status: {type: String, default: 'pending' },
    priority: {type: String, enum: ['low', 'medium', 'high'], default: 'low' },
    assignedTo: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, {timestamps: true})

module.exports = mongoose.model('Task', taskSchema);