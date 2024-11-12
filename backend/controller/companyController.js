import { Company } from "../models/companyModel.js";
import cloudinary from "../Cloudinary/cloudinary.js";

// Controller to create a new company
export const createCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const recruiterId = req.id; // ID of the recruiter creating the company
        const logoFile = req.files.logo; // Access the logo file from `req.files`

        // Check if all required fields are provided
        if (!name || !description || !website || !location || !recruiterId || !logoFile) {
            return res.status(400).send({
                success: false,
                message: "All fields are required"
            });
        }

        // Check if a company with the same name already exists for this recruiter
        const existCompany = await Company.findOne({ name, recruiterId });
        if (existCompany) {
            return res.status(400).send({
                success: false,
                message: "Company with a similar name already exists"
            });
        }

        // Check if the website already exists for a different company name
        const webCompany = await Company.findOne({ website });
        if (webCompany && webCompany.name !== name) {
            return res.status(400).send({
                success: false,
                message: "You are giving wrong website for that company"
            });
        }

        // Upload the logo to Cloudinary
        const result = await cloudinary.uploader.upload(logoFile.tempFilePath);
        if (!result) {
            return res.status(400).send({
                success: false,
                message: "Error in uploading logo of company: Cloudinary Error"
            });
        }

        // Create a new company with the uploaded logo URL
        const company = new Company({
            name,
            description,
            website,
            location: location.split(","), // Split location string into array
            recruiterId,
            logo: result.secure_url // Store Cloudinary URL for the logo
        });

        // Save the new company in the database
        const newCompany = await company.save();
        return res.status(201).send({
            success: true,
            message: "Company created successfully",
            newCompany
        });
    } catch (error) {
        console.error("Error creating company:", error);
        return res.status(500).send("Server error: " + error);
    }
};

// Controller to update an existing company
export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const _id = req.params.id; // Company ID to be updated
        const recruiterId = req.id; // ID of the recruiter making the update
        const logoFile = req.files.logo; // Access the logo file from `req.files`

        // Check if all required fields are provided
        if (!name || !description || !website || !location || !logoFile) {
            return res.status(400).send({
                success: false,
                message: "All fields are required for Updating"
            });
        }

        // Check if the website already exists for a different company name
        const webCompany = await Company.findOne({ website });
        if (webCompany && webCompany.name !== name) {
            return res.status(400).send({
                success: false,
                message: "The website you provided is matched with other company's website"
            });
        }

        // Upload the new logo to Cloudinary
        const result = await cloudinary.uploader.upload(logoFile.tempFilePath);
        if (!result) {
            return res.status(400).send({
                success: false,
                message: "Error in uploading logo of company: Cloudinary Error"
            });
        }

        // Update company data, including the new logo URL and location
        const newLocation = location.split(",");
        const updatedData = await Company.findByIdAndUpdate(
            _id,
            { name, description, website, location: newLocation, logo: result.secure_url },
            { new: true }
        );

        if (!updatedData) {
            return res.status(404).send({
                success: false,
                message: "Company not found while updating"
            });
        }

        return res.status(200).send({
            success: true,
            message: "Company Updated Successfully",
            updatedData
        });
    } catch (error) {
        return res.status(500).send("Server error: " + error);
    }
};

// Controller to get a company by ID
export const getCompanyById = async (req, res) => {
    try {
        const _id = req.params.id; // Company ID to be retrieved
        const company = await Company.findById({ _id });

        if (!company) {
            return res.status(404).send({
                success: false,
                message: "Company not found"
            });
        }

        return res.status(200).send({
            success: true,
            company
        });
    } catch (error) {
        return res.status(500).send("Server error: " + error);
    }
};

// Controller to get all companies created by a specific recruiter
export const getAllCompanies = async (req, res) => {
    try {
        const recruiterId = req.id; // Recruiter ID to filter companies
        const keyword = req.query.keyword || ""; // Search keyword

        const query = {
            recruiterId,
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        };

        // Retrieve companies that match the query
        const companies = await Company.find(query).sort({ createdAt: -1 });
        if (!companies) {
            return res.status(404).send({
                success: false,
                message: "Company not found"
            });
        }

        return res.status(200).send({
            success: true,
            companies
        });
    } catch (error) {
        return res.status(500).send("Server error: " + error);
    }
};

// Controller to delete a company by ID
export const deleteCompany = async (req, res) => {
    try {
        const _id = req.params.id; // Company ID to be deleted
        const deletedCompany = await Company.findByIdAndDelete({ _id });

        if (!deletedCompany) {
            return res.status(404).send({
                success: false,
                message: "Company not found"
            });
        }

        return res.status(200).send({
            success: true,
            message: "Company Deleted Successfully"
        });
    } catch (error) {
        return res.status(500).send("Server error: " + error);
    }
};
