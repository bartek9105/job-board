const mongoose = require('mongoose')

const offerSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        maxlength: [30, 'Title cannot be longer than 30 characters']
    },
    category: {
        type: String,
        enum: ['Frontend', 'Backend', 'Fullstack', 'UX/UI', 'Devops', 'Data Science', 'Testing', 'PM']
    },
    type: {
        type: String,
        enum: ['Full Time', 'Part Time']
    },
    salaryMin: {
        type: Number,
        trim: true
    },
    salaryMax: {
        type: Number,
        trim: true
    },
    description: {
        type: String,
        maxlength: [1000, 'Description cannot be longer than 1000 characters'],
        trim: true
    },
    location: {
        type: String,
        trim: true
    },
    remote: {
        type: Boolean,
        default: false
    },
    contract: {
        type: String,
        enum: ['Employment contract', 'B2B', 'Mandatory contract']
    },
    technologies: [{
        type: String,
    }],
    benefits: [{
        type: String
    }],
    status: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

offerSchema.index({ location: 'text' });

module.exports = mongoose.model('Offer', offerSchema)