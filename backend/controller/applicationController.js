import { Application } from "../models/applicationModel.js";
import { JobModel } from "../models/jobModel.js";
import { sendEmail } from "../utils/sendEmail.js";

// Controller to apply for a job
export const applyForJob = async (req, res) => {
    try {
        const userId = req.body.id;  // User ID of the applicant
        const jobId = req.params.id; // Job ID from request parameters

        // Check if the user has already applied for the job
        const alreadyApplyForJob = await Application.findOne({ jobInquiry: jobId, applicant: userId });
        if (alreadyApplyForJob) {
            return res.status(400).send({
                success: false,
                message: "You've already applied for this job"
            });
        }

        // Find the job to ensure it exists
        const job = await JobModel.findById({ _id: jobId });
        if (!job) {
            return res.status(400).send({
                success: false,
                message: "Job not found"
            });
        }

        // Check if the application deadline has passed
        const jobLastDateObj = new Date(job.jobLastDate);
        if (jobLastDateObj < new Date()) {
            return res.status(400).send({
                success: false,
                message: "This application has been closed, you are late!"
            });
        }

        // Create a new application for the job
        const application = new Application({
            jobInquiry: jobId,
            applicant: userId
        });
        const newApplication = await application.save();

        // Update the job to include the new application
        job.applications.push(newApplication._id);
        await job.save();

        return res.status(201).send({
            success: true,
            message: "Applied for job successfully",
            newApplication
        });
    } catch (error) {
        return res.status(500).send("Server error:" + error);
    }
};

// Controller to get all applications submitted by a specific user
export const getAllUserApplication = async (req, res) => {
    try {
        const userId = req.params.id; // User ID from request parameters

        // Retrieve applications for the user, populate job and company details
        const applications = await Application.find({ applicant: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: "jobInquiry",
                options: { sort: { createdAt: -1 } },
                populate: {
                    path: "company",
                    options: { sort: { createdAt: -1 } }
                }
            });

        if (!applications) {
            return res.status(404).send({
                success: false,
                message: "You haven't applied for any job"
            });
        }

        return res.status(200).send({
            success: true,
            applications
        });
    } catch (error) {
        return res.status(500).send("Server error:" + error);
    }
};

// Controller to get all applications for a specific job, intended for recruiters
export const getAllApplicationForJob = async (req, res) => {
    try {
        const jobId = req.params.id; // Job ID from request parameters

        // Find the job and populate its applications and applicant details
        const job = await JobModel.findById({ _id: jobId })
            .populate({
                path: "applications",
                options: { sort: { createdAt: -1 } },
                populate: {
                    path: "applicant",
                    options: { sort: { createdAt: -1 } }
                }
            });

        if (!job) {
            return res.status(404).send({
                success: false,
                message: "No application found"
            });
        }

        return res.status(200).send({
            success: true,
            job
        });
    } catch (error) {
        return res.status(500).send("Server error:" + error);
    }
};

// Controller to update the status of an application and notify the applicant
export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;          // New status from request body
        const application_id = req.params.id; // Application ID from request parameters

        // Find and update the application with the new status
        const application = await Application.findByIdAndUpdate(
            { _id: application_id },
            { status },
            { new: true }
        )
        .populate({ path: 'applicant' })
        .populate({ path: 'jobInquiry' });

        if (!application) {
            return res.status(404).send({
                success: false,
                message: "No application found"
            });
        }

        // Send email notification to the applicant
        const applicant = application.applicant;
        const subject = `Application Status Update: ${status}`;
        const message = `Dear ${applicant.fullName},\n\nYour application status for the position of ${application.jobInquiry.title} has been updated to "${status}".\n\nThank you for your interest.\n\nBest regards,\nJobQuest Team`;

        await sendEmail({
            email: applicant.email,
            subject,
            message
        });

        return res.status(200).send({
            success: true,
            message: "Status Updated Successfully",
            application
        });
    } catch (error) {
        return res.status(500).send("Server error:" + error);
    }
};
