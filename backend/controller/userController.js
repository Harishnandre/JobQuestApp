import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JobModel } from './../models/jobModel.js';
import getDataUri from "../utils/datauri.js";
import cloudinary from "../Cloudinary/cloudinary.js";

// Function to register a new user
export const registerNewUser = async (req, res) => {
    try {
        const { fullName, gender, email, address, phoneNumber, password, role, answer, profilePhoto } = req.body;

        // Validate required fields
        if (!fullName || !gender || !email || !address || !phoneNumber || !password || !role || !answer) {
            return res.status(400).send({
                success: false,
                message: "All fields are required for creating account"
            });
        }

        // Check if user with the given email already exists
        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).send({
                success: false,
                message: "A user with this email id already exists"
            });
        }

        // Validate password length
        if (password.length < 8) {
            return res.status(400).send({
                success: false,
                message: "Password must contain at least 8 characters"
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user object and save it to the database
        const user = new User({
            fullName,
            gender,
            email,
            address,
            phoneNumber,
            password: hashedPassword,
            role,
            answer,
            profile: {
                profilePhoto
            }
        });
        const newUser = await user.save();

        // Send success response
        res.status(201).send({
            success: true,
            message: "Registered Successfully",
            newUser
        });
    } catch (error) {
        return res.status(500).send("Server error:" + error);
    }
};

// Function to log in an existing user
export const loginUser = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Validate required fields
        if (!email || !password || !role) {
            return res.status(400).send({
                success: false,
                message: "All fields are required"
            });
        }

        // Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Verify password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).send({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Check if the role matches
        if (role != user.role) {
            return res.status(400).send({
                success: false,
                message: "Account with current role doesn't exist."
            });
        }

        // Generate a JWT token
        const tokenData = { userId: user._id };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        // Send token in a cookie and respond with success
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, secure: true, sameSite: 'strict' })
            .send({
                success: true,
                message: `Welcome user: ${user.fullName}`,
                auth: {
                    user,
                    token
                }
            });
    } catch (error) {
        return res.status(500).send("Server error:" + error);
    }
};

// Function to log out a user
export const logoutUser = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0, httpOnly: true, secure: true, sameSite: 'Strict' }).send({
            success: true,
            message: "Logged out Successfully"
        });
    } catch (error) {
        return res.status(500).send("Server error:" + error);
    }
};

// Function to reset password with security answer verification
export const forgetPassword = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body;

        // Validate required fields
        if (!email || !answer || !newPassword) {
            return res.status(400).send({
                success: false,
                message: "All fields are required"
            });
        }

        // Check if user exists and answer matches
        const user = await User.findOne({ email, answer });
        if (!user) {
            return res.status(400).send({
                success: false,
                message: "Invalid Email or Answer"
            });
        }

        // Validate new password length
        if (newPassword.length < 8) {
            return res.status(400).send({
                success: false,
                message: "Password must contain at least 8 characters"
            });
        }

        // Hash the new password and update user in the database
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const updateUser = await User.findByIdAndUpdate({ _id: user._id }, { password: hashedPassword }, { new: true });

        if (!updateUser) {
            return res.status(404).send({
                success: false,
                message: "User not found while updating"
            });
        }

        // Send success response
        res.status(200).send({
            success: true,
            message: "Password Updated Successfully",
            updateUser
        });
    } catch (error) {
        return res.status(500).send("Server error:" + error);
    }
};

// Function to update a user's profile
export const updateProfile = async (req, res) => {
    try {
        const { fullName, email, address, phoneNumber, bio, role1, role2, role3, id: userId, role, resume } = req.body;
        let profilePhoto = req.files?.profilePhoto;

        // Validate required fields
        if (!fullName || !email || !address || !phoneNumber || !profilePhoto) {
            return res.status(400).send({
                success: false,
                message: "All fields and profile photo are required to complete Profile",
            });
        }

        // Additional validation for job seekers
        if (role === "Job-Seeker" && (!bio || !role1 || !role2 || !role3 || !resume)) {
            return res.status(400).send({
                success: false,
                message: "All fields and a resume link are required to complete Profile",
            });
        }

        // Upload profile photo to Cloudinary
        let profilePhotoUpload = await cloudinary.uploader.upload(profilePhoto.tempFilePath, {
            resource_type: "image",
        });

        // Prepare data for profile update
        const updateData = {
            fullName,
            email,
            address,
            phoneNumber,
            profile: {
                bio,
                preferredJobRole: { role1, role2, role3 },
                profilePhoto: profilePhotoUpload.secure_url,
            },
        };

        // Add resume link if the role is Job-Seeker
        if (role === "Job-Seeker" && resume) {
            updateData.profile.resume = resume;
        }

        // Update user profile in the database
        const updateUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

        if (!updateUser) {
            return res.status(404).send({
                success: false,
                message: "User not found while updating",
            });
        }

        // Send success response
        res.status(200).send({
            success: true,
            message: "Profile Updated Successfully",
            updateUser,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ success: false, message: "Server error: " + error.message });
    }
};

// Function to update password when user is logged in
export const updatePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const userId = req.id;

        // Validate required fields
        if (!oldPassword || !newPassword) {
            return res.status(400).send({
                success: false,
                message: "Please provide both current and new passwords for updating."
            });
        }

        // Validate new password length
        if (newPassword.length < 8) {
            return res.status(400).send({
                success: false,
                message: "New password must contain at least 8 characters."
            });
        }

        // Find the user by ID and verify current password
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found."
            });
        }

        // Check if the current password matches
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).send({
                success: false,
                message: "Current password is incorrect."
            });
        }

        // Hash the new password and update it in the database
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate(userId, { password: hashedPassword });

        // Send success response
        return res.status(200).send({
            success: true,
            message: "Password updated successfully."
        });
    } catch (error) {
        return res.status(500).send("Server error:" + error);
    }
};

// Function to handle bookmark or unbookmark actions on jobs
export const bookmarkJob = async (req, res) => {
    try {
        const jobId = req.params.jobId;
        const userId = req.id;

        // Find user by ID
        const user = await User.findById(userId);

        // Check if job is already bookmarked
        const isBookmarked = user.profile.bookmarks.includes(jobId);

        // Add or remove bookmark based on current state
        if (isBookmarked) {
            user.profile.bookmarks.pull(jobId); // Remove bookmark
        } else {
            user.profile.bookmarks.push(jobId); // Add bookmark
        }

        await user.save();

        // Send success response
        return res.status(200).send({
            success: true,
            message: isBookmarked ? "Job unbookmarked successfully" : "Job bookmarked successfully",
        });
    } catch (error) {
        return res.status(500).send("Server error:" + error);
    }
};

// Function to recommend jobs based on user's preferred roles
export const getRecommendedJobs = async (req, res) => {
    try {
        const userId = req.id;

        // Find user and get preferred job roles
        const user = await User.findById(userId);
        const preferredRoles = user.profile.preferredJobRole;

        // Fetch jobs that match the preferred roles
        const jobs = await JobModel.find({
            "role": { $in: [preferredRoles.role1, preferredRoles.role2, preferredRoles.role3] }
        });

        // Send success response with recommended jobs
        return res.status(200).send({
            success: true,
            jobs,
        });
    } catch (error) {
        return res.status(500).send("Server error:" + error);
    }
};
