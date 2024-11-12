import { Application } from "../models/applicationModel.js";
import { JobModel } from "../models/jobModel.js";
import { sendEmail } from "../utils/sendEmail.js";

export const applyForJob=async(req,res)=>{
    try {
        const userId=req.body.id;
        const jobId=req.params.id;
        //Check Job-seeker is already applied for a job or not
        const alreadyApplyForJob=await Application.findOne({jobInquiry:jobId,applicant:userId});
        if(alreadyApplyForJob){
            return res.status(400).send({
                success:false,
                message:"You've already applied for this job"
            });
        }
        //Find the in which job-seeker try to apply for job
        const job=await JobModel.findById({_id:jobId});
        if(!job){
            return res.status(400).send({
                success:false,
                message:"Job not found"
            });
        }
        //Check the Job last date opening ,if it is open or closed
        const jobLastDateObj = new Date(job.jobLastDate);
        if (jobLastDateObj < new Date()) {
            return res.status(400).send({
                success: false,
                message: "This application has been closed,You are Late!"
            });
        }
        //A new job-seeker apply for the job
        const application=new Application({
            jobInquiry:jobId,
            applicant:userId
        });
        const newApplication=await application.save();

        //Save this in applications field of JobModel for tracking How many Job-seeker apply for that job
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
        const userId=req.params.id;
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
        //Populating the user so that email can ne send to the applicant about the status of their application accepted or rejected
        const application=await Application.findByIdAndUpdate({_id:application_id},{status},{new:true}).populate({path:'applicant'}).populate({path:'jobInquiry'});
        if(!application){
            return res.status(404).send({
                success:false,
                message:"No application found"
            });
        }
        console.log(application, application_id);
        // Send email notification
        const applicant = application.applicant;
        const subject = `Application Status Update: ${status}`;
        const message = `Dear ${applicant.fullName},\n\nYour application status for the position of ${application.jobInquiry.title} 
                        has been updated to "${status}".\n\nThank you for your interest.\n\nBest regards,\nJobQuest Team`;
        await sendEmail({
            email: applicant.email,
            subject,
            message
        });
        return res.status(200).send({
                success:true,
                message:"Status Updated Successfully",
                application
        }); 
    } catch (error) {
        return res.status(500).send("Server error:" + error);
    }
}