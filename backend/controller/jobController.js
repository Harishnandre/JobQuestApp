import { JobModel } from "../models/jobModel.js";

export const createJob=async(req,res)=>{
    try {
        const {title,description,requirements,salary,location,jobType,vacancies,experience,company}=req.body;
        const createdBy=req.id;
        if(!title||!description||!requirements||!salary||!location||!jobType||!vacancies||!company||!createdBy||!experience){
            return res.status(400).send({
                success:false,
                message:"All fields are required"
           });
        }
        const job=new JobModel({
                  title,
                  description,
                  requirements:requirements.split(","),
                  salary,
                  location,
                  jobType,
                  vacancies,
                  experience,
                  company,
                  createdBy
        });
        const newJob=await job.save();
        return res.status(201).send({
            success:true,
            message:"Job created successfullly",
            newJob
        });
    } catch (error) {
        return res.status(500).send("Server error:" + error);
    }
}

//For Job Seeker getAllJobs
export const getAllJobs=async(req,res)=>{
    try {
         const keyword=req.query.keyword || "";
         const query={
            $or:[
                    {title:{$regex:keyword,$options:"i"}},
                    {description:{$regex:keyword,$options:"i"}}
                ]
            }
       const jobs=await JobModel.find(query).populate({path:"company"}).sort({createdAt:-1});
       if(!jobs){
        return res.status(404).send({
            success:false,
            message:"Jobs not found"    
        });
       }  
       return res.status(200).send({
        success:true,
        jobs
       });
    } catch (error) {
        return res.status(500).send("Server error:" + error);
    }
}

//For Job Seeker getJobById
export const getJobById=async(req,res)=>{
    try {
        const _id=req.params.id;
        const jobs=await JobModel.findById({_id}).populate("company");
        if(!jobs){
            return res.status(404).send({
                success:false,
                message:"Jobs not found"    
            });
           }  
           return res.status(200).send({
            success:true,
            jobs
           });
    } catch (error) {
        return res.status(500).send("Server error:" + error);
    }
}

// Get all job created by recruiter
export const getAllRecruiterJobs=async(req,res)=>{
    try {
        const createdBy=req.id;
        const jobs=await JobModel.find({createdBy});
        if(!jobs){
            return res.status(404).send({
                success:false,
                message:"Jobs not found"    
            });
        }  
        return res.status(200).send({
        success:true,
        jobs
        });  
    } catch (error) {
        return res.status(500).send("Server error:" + error);
    }
}