const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        title: { type: String, required: true },
        description: { type: String, required: true },
        dueDate: { type: Date, required: true },
        priority: { type: String, enum: ['low', 'medium', 'high'], required: true },
        status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);
