import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { JobModel } from './../models/jobModel.js';
import getDataUri from "../utils/datauri.js";
import cloudinary from "../Cloudinary/cloudinary.js";


//Register New User
export const registerNewUser=async(req,res)=>{
    try {
        const {fullName,gender,email,address,phoneNumber,password,role,answer,profilePhoto}=req.body;
        
        if(!fullName||!gender||!email||!address||!phoneNumber||!password||!role||!answer){
        return res.status(400).send({
            success:false,
            message:"All fields are required for creating account"    
        });
        }
        const existUser=await User.findOne({email});
        if(existUser){
        return res.status(400).send({
               success:false,
               message:"A user with this email id is already exist"
          });  
        }
        if(password.length < 8){
            return res.status(400).send({
                 success : false,
                 message : "Password must contain at least 8 characters"
             })
            }
        const hashedPassword=await bcrypt.hash(password,10);
        const user=new User({
            fullName,
            gender,
            email,
            address,
            phoneNumber,
            password:hashedPassword,
            role,
            answer,
            profile: {
                profilePhoto
            }
        });
        const newUser=await user.save();
        res.status(201).send({
            success:true,
            message:"Register Successfully",
            newUser
        });      
    } catch (error) {
        return res.status(500).send("Server error:" + error);
    }
}

export const loginUser=async (req,res)=>{
    try {
        const {email,password,role}=req.body;
        if(!email||!password||!role){
        return res.status(400).send({
            success:false,
            message:"All fields are required"    
        }); 
        }
        //check user is logged in or not
        let user=await User.findOne({email});
        if(!user){
        return res.status(400).send({
            success:false,
            message:"Invalid email or password"    
        }); 
        }
        //do password matching enter by user and compare with regisered password
        const isPasswordMatch=await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){   
        return res.status(400).send({
            success:false,
            message:"Invalid email or password"    
        }); 
        }
        if(role!=user.role)
        return res.status(400).send({
            success:false,
            message:"Account with current role doesn't exist."    
        });  
        user.password=password;  
        const tokenData={
            userId:user._id
        }
        //Token generation
        const token=jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });
        return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpsOnly:true,secure:true,sameSite:'strict'})
                 .send({
                    success:true,
                    message:`Welcome user: ${user.fullName}`,
                    auth:{
                        user,
                        token
                    }
                 });

    } catch (error) {
        return res.status(500).send("Server error:" + error);
    }
}

export const logoutUser=async (req,res)=>{
     try {
       return res.status(200).cookie("token","",{maxAge:0, httpOnly: true, secure: true, sameSite: 'Strict'}).send({
                  success:true,
                  message:"Logged out Successfully"
                  });
     }catch (error){
        return res.status(500).send("Server error:" + error);
    }
}


//Forget password function
export const forgetPassword=async(req,res)=>{
     try {
         const {email,answer,newPassword}=req.body;
         if(!email||!answer||!newPassword){
            return res.status(400).send({
                success:false,
                message:"All fields are required"    
            });
        }  
        
        //check user provide correct answer field and email
        const user=await User.findOne({email,answer});
        if(!user){
            return res.status(400).send({
                success:false,
                message:"Invalid Email or Answer"    
            });   
        }

        if(newPassword.length < 8){
            return res.status(400).send({
                 success : false,
                 message : "Password must contain at least 8 characters"
             })
            }

       //Hashed the password     
        const hashedPassword=await bcrypt.hash(newPassword,10);
        const updateUser=await User.findByIdAndUpdate({_id:user._id},{password:hashedPassword},{new:true});
        if(!updateUser){
            return res.status(404).send({
                success:false,
                message:"User not found while updating"    
            }); 
        }
        res.status(200).send({
            success:true,
            message:"Password Updated Successfully",
            updateUser
        });
     } catch (error) {
        return res.status(500).send("Server error:" + error);
     }
}

//Update user Profile
export const updateProfile = async (req, res) => {
    try {
      const {
        fullName,
        email,
        address,
        phoneNumber,
        bio,
        role1,
        role2,
        role3,
        id: userId,
        role,
        resume,  // Now expecting this to be a URL string
      } = req.body;
      let profilePhoto = req.files?.profilePhoto;
  
      // Validate required fields
      if (!fullName || !email || !address || !phoneNumber || !profilePhoto) {
        return res.status(400).send({
          success: false,
          message: "All fields and profile photo are required to complete Profile",
        });
      }
  
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
      const updateUser = await User.findByIdAndUpdate(
        userId,
        updateData,
        { new: true }
      );
  
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
  

//update Password when user loggein
 // Make sure the path is correct for the User model

export const updatePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const userId = req.id;

        if (!oldPassword || !newPassword) {
            return res.status(400).send({
                success: false,
                message: "Please provide both current and new passwords for updating."
            });
        }

        if (newPassword.length < 8) {
            return res.status(400).send({
                success: false,
                message: "New password must contain at least 8 characters."
            });
        }

        // Find the user by ID
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

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the password in the database
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { password: hashedPassword },
            { new: true }
        );

        res.status(200).send({
            success: true,
            message: "Password updated successfully.",
            updatedUser
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Server error: " + error.message
        });
    }
};


//For bookmark Job
export const bookmarkAnyJobs=async(req,res)=>{
    try {
        const jobId=req.params.id;
        const userId=req.id;
        const user=await User.findById({_id:userId});
        if(!user){
            return res.status(404).send({
                success:false,
                message:"User not found",
            });
        }
        user.bookmarkJob.push(jobId);
        await user.save();
        return res.status(200).send({
            success:true,
            message:"Job Bookmark Successfully",
            user
        });  
    } catch (error) {
        return res.status(500).send("Server error:" + error); 
    }
}

//For unbookmark job
export const unbookmarkJob=async(req,res)=>{
    try {
        const jobId=req.params.id;
        const userId=req.id;
        const user=await User.findById({_id:userId});
        if(!user){
            return res.status(404).send({
                success:false,
                message:"User not found"
            });
        }
        user.bookmarkJob = user.bookmarkJob.filter(
            _id => !_id.equals(jobId) 
        );
        await user.save();
        return res.status(200).send({
            success:true,
            message:"Job UnBookmark Successfully",
            user
        });
    } catch (error) {
        return res.status(500).send("Server error:" + error); 
    }
}

//Get user by Id
export const getUserById=async(req,res)=>{
    try {
        const userId=req.params.id;
        const user=await User.findById({_id:userId}).populate({
            path:"recommendedJobs",
            populate:{path:"company",options:{sort:{createdAt:-1}}}
        })
        .populate({
            path:"bookmarkJob",
            options:{sort:{createdAt:-1}},
            populate:{path:"company",options:{sort:{createdAt:-1}}}
        })

        if(!user){
            return res.status(404).send({
                success:false,
                message:"User not found"
            });
        }
        return res.status(200).send({
            success:true,
            user
        });
    } catch (error) {
        return res.status(500).send("Server error:" + error); 
    }
}

//Get all jobs according to the prefference of job seeker
export const getRecomendedJobs = async (req, res) => {
    try {
      const userId = req.id;
      const user = await User.findById(userId); // Get the user by ID
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }
  
      // Destructure the preferred job roles from the user profile
      const { role1, role2, role3 } = user.profile.preferredJobRole;
  
      // Search for jobs that match each role and sort them by creation time
      let matchedJobs = [];
      const roles = [role1, role2, role3];
  
      for (const role of roles) {
        const jobs = await JobModel.find({
          title: {$regex:role,$options:"i"}, // Regex search for job titles
        })
          .sort({ createdAt: -1 }) // Sort by creation date within each role
          .limit(10); // Limit the results to 10 jobs per role
        matchedJobs = [...matchedJobs, ...jobs]; // Append the new results
      }
  
      // Save the recommended jobs in the user profile
      user.recommendedJobs = matchedJobs.map(job => job._id);
    
  
      await user.save(); // Save the updated user document
  
      // Return the recommended jobs
      res.json({ success: true, jobs: matchedJobs });
  
    } catch (error) {
      console.error('Error fetching and saving recommended jobs:', error);
      res.status(500).json({ success: false, message: 'Server error', error });
    }
  };