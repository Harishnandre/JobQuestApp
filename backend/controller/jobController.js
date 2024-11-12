import { Company } from "../models/companyModel.js";
import { JobModel } from "../models/jobModel.js";

//Post a new job
export const createJob=async(req,res)=>{
    try {
        const {title,description,requirements,salary,location,jobType,vacancies,experience,company,jobLastDate}=req.body;
        const createdBy=req.id;
        //Check Date enter by recruiter is in future aor not
        const jobLastDateObj = new Date(jobLastDate);
        if (jobLastDateObj < new Date()) {
            return res.status(400).send({
                success: false,
                message: "Job Last Date must be in the future"
            });
        }

        if(!title||!description||!requirements||!salary||!location|| !jobLastDate ||!jobType||!vacancies||!company||!createdBy||!experience){
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
                  jobLastDate,
                  createdBy
        });
        const newJob=await job.save();
        return res.status(201).send({
            success:true,
            message:"Job created successfullly",
            newJob
        });
    } catch (error) {
        console.log(error);
        
        return res.status(500).send("Server error:" + error);
    }
}

//For Job Seeker getAllJobs
export const getAllJobs=async(req,res)=>{
    try {
        const keyword = req.query.keyword || "";
        const companies = await Company.find({
        name: { $regex: keyword, $options: "i" }
        });
        const companyIds = companies.map(company => company._id);
        const query = {
        $or: [
            { title: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
            { company: { $in: companyIds } }  // Search by company IDs
        ]
    };  
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
        const keyword=req.query.keyword || "";
        const query={
           createdBy,
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

//update job
export const updateJob=async(req,res)=>{
    try {
        const jobId=req.params.id;
        const createdBy=req.id;
        const {title,description,requirements,salary,location,jobType,vacancies,jobLastDate,experience,company}=req.body;
        const jobLastDateObj = new Date(jobLastDate);
        if (jobLastDateObj < new Date()) {
            return res.status(400).send({
                success: false,
                message: "Job Last Date must be in the future"
            });
        }

        if(vacancies <= 0 || salary<=0){
            return res.status(400).send({
                success:false,
                message:"Salary or Positions must be positive"
           });
        }
        if(!title||!description||!requirements||!salary||!jobLastDate||!location||!jobType||!company||!createdBy||!experience){
            return res.status(400).send({
                success:false,
                message:"All fields are required"
           });
        }     
        if(!jobId){
            return res.status(400).send({
                success:false,
                message:"Job id is required"
            });
        }
        const updatedJob=await JobModel.findByIdAndUpdate({_id:jobId},{title,
                                                                       description,
                                                                       requirements:requirements.split(","),
                                                                       salary,
                                                                       location,
                                                                       jobType,
                                                                       vacancies,
                                                                       experience,
                                                                       company,
                                                                       jobLastDate,
                                                                       createdBy
                                                                       },{new:true});
        if(!updatedJob){
            return res.status(404).send({
                success:false,
                message:"Job not found while updating"
            });
        }   
        return res.status(200).send({
            success:true,
            message:"Job Updated successfully",
            updatedJob
        });                                                      
    } catch (error) {
        return res.status(500).send("Server error:" + error);
    }
}