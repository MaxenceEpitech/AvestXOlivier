const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        createdBy: {
            type: String,
            required: true,
            ref: 'User',
        },
        assignedTo: {
            type: String,
            required: true,
            ref: 'User',
        },
        executionDate: {
            type: Date,
            required: true,
        },
        isCompleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Task', TaskSchema);