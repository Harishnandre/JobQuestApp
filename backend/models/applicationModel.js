import mongoose from "mongoose";

const applicationSchema=new mongoose.Schema({
    jobInquiry:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'JobModel',
        required:true
    },
    applicant:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    status:{
        type:String,
        enum:["Pending","Rejected","Accepted"],
        default:"Pending"
    }
},{timestamps:true});

export const Application=mongoose.model('Application',applicationSchema);