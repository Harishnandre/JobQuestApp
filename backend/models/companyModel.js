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
        type:String
    },
    location:{
        type:String,
        trim:true
    },
    logo:{
        type:String
    },
    requiterId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},{timestamps:true});

export const Company=mongoose.model('Company',companySchema);