import { Application } from "../models/applicationModel.js";
import { JobModel } from "../models/jobModel.js";

export const applyForJob=async(req,res)=>{
    try {
        const userId=req.id;
        const jobId=req.params.id;
        const alreadyApplyForJob=await Application.findOne({jobInquiry:jobId,applicant:userId});
        if(alreadyApplyForJob){
            return res.status(400).send({
                success:false,
                message:"You've already applied for this job"
            });
        }
        const job=await JobModel.findById({_id:jobId});
        if(!job){
            return res.status(400).send({
                success:false,
                message:"Job not found"
            });
        }
        const application=new Application({
            jobInquiry:jobId,
            applicant:userId
        });
        const newApplication=await application.save();
        job.applications.push(newApplication._id);
        await job.save();
        return res.status(201).send({
            success:true,
            message:"Applied for job successfully",
            newApplication
        })
    } catch (error) {
        return res.status(500).send("Server error:" + error);
    }
}
// Get all application in which Job seeker applied for job
export const getAllUserApplication=async(req,res)=>{
    try {
        const userId=req.id;
        const applications=await Application.find({applicant:userId})
                                .sort({createdAt:-1})
                                .populate({
                                    path:"jobInquiry",
                                    options:{sort:{createdAt:-1}},
                                    populate:{
                                        path:"company",
                                        options:{sort:{createdAt:-1}}
                                    }
                                });
         if(!applications){
            return res.status(404).send({
                success:false,
                message:"You'vnt applied for any job"
            });
         }   
         return res.status(200).send({
            success:true,
            applications
         });                               
    } catch (error) {
        return res.status(500).send("Server error:" + error);
    }
}
//This is at recruiter side ,contain all applications to a particular job 
export const getAllApplicationForJob=async(req,res)=>{
    try {
        const jobId=req.params.id;
        const job=await JobModel.findById({_id:jobId})
        .populate({
                    path:"applications",
                    options:{sort:{createdAt:-1}},
                    populate:{
                    path:"applicant",
                    options:{sort:{createdAt:-1}}
                }});
        if(!job){
            return res.status(404).send({
                success:false,
                message:"No application found"
            });
        }
        return res.status(200).send({
            success:true,
            job
         }); 
    } catch (error) {
        return res.status(500).send("Server error:" + error);
    }
}

export const updateStatus=async(req,res)=>{
    try {
        const {status}=req.body;
        const application_id=req.params.id;
        const application=await Application.findByIdAndUpdate({_id:application_id},{status},{new:true});
        if(!application){
            return res.status(404).send({
                success:false,
                message:"No application found"
            });
        }
        return res.status(200).send({
                success:true,
                message:"Status Updated Successfully",
                application
        }); 
    } catch (error) {
        return res.status(500).send("Server error:" + error);
    }
}