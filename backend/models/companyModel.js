import mongoose from "mongoose";

const companySchema= new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    description:{
        type:String,
        trim:true,
        required:true
    },
    website:{
        type:String,
        required:true
    },
    location:{
        type:[String],
        required:[true,"Atleast one location is required"]
    },
    logo:{
        type:String,
    },
    requiterId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,"Recruiter id is required"]
    }
},{timestamps:true});

export const Company=mongoose.model('Company',companySchema);