import { Company } from "../models/companyModel.js";
import { JobModel } from "../models/jobModel.js";

// Controller for creating a job post
export const createJob = async (req, res) => {
    try {
        // Destructuring required fields from request body
        const { title, description, requirements, salary, location, jobType, vacancies, experience, company, jobLastDate } = req.body;
        const createdBy = req.id;  // ID of the recruiter creating the job
        const jobLastDateObj = new Date(jobLastDate);

        // Check if jobLastDate is in the future
        if (jobLastDateObj < new Date()) {
            return res.status(400).send({
                success: false,
                message: "Job Last Date must be in the future"
            });
        }

        // Ensure all required fields are provided
        if (!title || !description || !requirements || !salary || !location || !jobLastDate || !jobType || !vacancies || !company || !createdBy || !experience) {
            return res.status(400).send({
                success: false,
                message: "All fields are required"
            });
        }

        // Create new job document
        const job = new JobModel({
            title,
            description,
            requirements: requirements.split(","),  // Convert requirements to an array
            salary,
            location,
            jobType,
            vacancies,
            experience,
            company,
            jobLastDate,
            createdBy
        });

        // Save job to database
        const newJob = await job.save();
        return res.status(201).send({
            success: true,
            message: "Job created successfully",
            newJob
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send("Server error:" + error);
    }
}

// Controller for job seekers to get all jobs
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";  // Keyword for search
        const companies = await Company.find({
            name: { $regex: keyword, $options: "i" }  // Find companies matching keyword
        });

        // Extract company IDs to filter jobs
        const companyIds = companies.map(company => company._id);
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
                { company: { $in: companyIds } }  // Match job company IDs
            ]
        };

        // Fetch jobs that match search criteria and sort by creation date
        const jobs = await JobModel.find(query).populate({ path: "company" }).sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(404).send({
                success: false,
                message: "Jobs not found"
            });
        }

        return res.status(200).send({
            success: true,
            jobs
        });
    } catch (error) {
        return res.status(500).send("Server error:" + error);
    }
}

// Controller to get a specific job by ID
export const getJobById = async (req, res) => {
    try {
        const _id = req.params.id;  // Job ID from request params
        const jobs = await JobModel.findById({ _id }).populate("company");  // Fetch job by ID with company details
        if (!jobs) {
            return res.status(404).send({
                success: false,
                message: "Jobs not found"
            });
        }

        return res.status(200).send({
            success: true,
            jobs
        });
    } catch (error) {
        return res.status(500).send("Server error:" + error);
    }
}

// Controller to get all jobs created by a specific recruiter
export const getAllRecruiterJobs = async (req, res) => {
    try {
        const createdBy = req.id;  // Recruiter ID from request
        const keyword = req.query.keyword || "";  // Keyword for search
        const query = {
            createdBy,
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        };

        // Fetch recruiter-specific jobs that match search criteria
        const jobs = await JobModel.find(query).populate({ path: "company" }).sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(404).send({
                success: false,
                message: "Jobs not found"
            });
        }

        return res.status(200).send({
            success: true,
            jobs
        });
    } catch (error) {
        return res.status(500).send("Server error:" + error);
    }
}

// Controller to update an existing job
export const updateJob = async (req, res) => {
    try {
        const jobId = req.params.id;  // Job ID from request params
        const createdBy = req.id;  // Recruiter ID from request
        const { title, description, requirements, salary, location, jobType, vacancies, jobLastDate, experience, company } = req.body;
        const jobLastDateObj = new Date(jobLastDate);

        // Ensure jobLastDate is in the future
        if (jobLastDateObj < new Date()) {
            return res.status(400).send({
                success: false,
                message: "Job Last Date must be in the future"
            });
        }

        // Validate salary and vacancies
        if (vacancies <= 0 || salary <= 0) {
            return res.status(400).send({
                success: false,
                message: "Salary or Positions must be positive"
            });
        }

        // Ensure all required fields are provided
        if (!title || !description || !requirements || !salary || !jobLastDate || !location || !jobType || !company || !createdBy || !experience) {
            return res.status(400).send({
                success: false,
                message: "All fields are required"
            });
        }

        // Ensure job ID is provided
        if (!jobId) {
            return res.status(400).send({
                success: false,
                message: "Job ID is required"
            });
        }

        // Update the job in the database
        const updatedJob = await JobModel.findByIdAndUpdate({ _id: jobId }, {
            title,
            description,
            requirements: requirements.split(","),  // Convert requirements to array
            salary,
            location,
            jobType,
            vacancies,
            experience,
            company,
            jobLastDate,
            createdBy
        }, { new: true });

        if (!updatedJob) {
            return res.status(404).send({
                success: false,
                message: "Job not found while updating"
            });
        }

        return res.status(200).send({
            success: true,
            message: "Job Updated successfully",
            updatedJob
        });
    } catch (error) {
        return res.status(500).send("Server error:" + error);
    }
}
