const mongoose = require('mongoose')

const offerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add offer title'],
        trim: true,
        maxlength: [30, 'Title cannot be longer than 30 characters']
    },
    category: {
        type: String,
        required: [true, 'Please choose job category'],
        enum: ['Frontend', 'Backend', 'Fullstack', 'UX/UI', 'Devops', 'Data Science', 'Testing', 'PM']
    },
    type: {
        type: String,
        required: [true, 'Please choose job type'],
        enum: ['Full Time', 'Half Time']
    },
    salary: {
        type: Number,
        required: [true, 'Please enter salary'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please enter job description'],
        maxlength: [1000, 'Description cannot be longer than 1000 characters'],
        trim: true
    },
    remote: {
        type: Boolean,
        default: false
    },
    contract: {
        type: String,
        required: [true, 'Please choose contract type'],
        enum: ['Employment contract', 'B2B', 'Mandatory contract']
    },
    technologies: [{
        type: String
    }],
    benefits: [{
        type: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Offer', offerSchema)