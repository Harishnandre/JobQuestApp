import mongoose from "mongoose";

// Custom validation function
function arrayLimit(val) {
    return val.length > 0;
}

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    requirements: {
        type: [String],
        required: [true, 'At least one requirement is needed'],
        validate: [arrayLimit, 'Requirements must be at least one.']
    },
    salary: {
        type: Number,
        required: true,
        min: [0, 'Salary must be a positive number']
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    jobType: {
        type: String,
        required: true,
        trim: true
    },
    vacancies: {
        type: Number,
        required: true,
        min: [1, 'There must be at least one vacancy']
    },
    company:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    applications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application'
    }]
},{timestamps:true});

export const JobModel=mongoose.model('JobModel',jobSchema);