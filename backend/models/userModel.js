import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true, 
        trim: true,
        minlength: [3, "Name must contain at least three characters"],
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: [validator.isEmail, "Please provide a valid Email"]
    },
    address:{
         type:String,
         required:true,
         trim:true
    },
    phoneNumber: {
        type: String, 
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator: function(v) {
                return /^\d+$/.test(v); // Ensures the phone number is numeric
            },
            message: "Phone number must contain only digits."
        },
        minlength: [8, "Phone number must contain at least 8 digits"],
        maxlength: [15, "Phone number must contain at most 15 digits"]
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: [8, "Password must contain at least 8 characters"],
        },
    role: {
        type: String,
        required: true,
        enum: ["Job-Seeker", "Recruiter"]
    },
    answer: {
        type: String,
        required: true,
        trim: true
    },
    profile: {
        bio: { type: String, default: "" },
        preferredJobRole:{
            role1:{type:String,default: "" },
            role2:{type:String,default: "" },
            role3:{type:String,default: "" }
        },
        resume: { type: String }, // URL to resume file
        resumeOriginalName: { type: String }, // Ensuring to store resume file format like .pdf or other extension
        company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
        profilePhoto: {
            type: String,
            default: ""
        }
    },
    bookmarkJob:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'JobModel',
     }],
    recommendedJobs:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'JobModel'
           }
       ]
}, { timestamps: true });

export const User = mongoose.model('User', userSchema); 
