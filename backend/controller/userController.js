import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { JobModel } from './../models/jobModel.js';
export const registerNewUser=async(req,res)=>{
    try {
        const {fullName,gender,email,address,phoneNumber,password,role,answer}=req.body;
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
            answer
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
        let user=await User.findOne({email});
        if(!user){
        return res.status(400).send({
            success:false,
            message:"Invalid email or password"    
        }); 
        }
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

export const forgetPassword=async(req,res)=>{
     try {
         const {email,answer,newPassword}=req.body;
         if(!email||!answer||!newPassword){
            return res.status(400).send({
                success:false,
                message:"All fields are required"    
            });
        }   
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

export const updateProfile=async(req,res)=>{
    try {
        const {fullName,email,address,phoneNumber,bio,role1,role2,role3,resume,profilePhoto}=req.body;
        if(!fullName||!email||!address||!phoneNumber||!bio||!role1||!role2||!role3){
            return res.status(400).send({
                success:false,
                message:"All fields are required to complete Profile"
            });
        }
        const userId=req.body.id;
        const updateUser=await User.findByIdAndUpdate({_id:userId},{fullName,email,address,phoneNumber,
                                         profile:{
                                            bio,
                                            preferredJobRole:{role1,role2,role3}
                                         }},{new:true});
        if(!updateUser){
            return res.status(404).send({
                success:false,
                message:"User not found while updating"    
            }); 
        } 
        res.status(200).send({
            success:true,
            message:"Profile Updated Successfully",
            updateUser
        });                               
    } catch (error) {
        return res.status(500).send("Server error:" + error);
    }
}

//update Password when user loggein
export const updatePassword=async(req,res)=>{
    try {
        const {newPassword}=req.body;
        const userId=req.id;
        if(!newPassword){
            return res.status(400).send({
                success:false,
                message:"Please provide new Password for updation"
            });
        }
        if(newPassword.length < 8){
            return res.status(400).send({
                 success : false,
                 message : "Password must contain at least 8 characters"
             })
            }
        const hashedPassword=await bcrypt.hash(newPassword,10);
        const updateUserPassword=await User.findByIdAndUpdate({_id:userId},{password:hashedPassword},{new:true});
        if(!updateUserPassword){
            return res.status(404).send({
                success:false,
                message:"User not found while updating"    
            });
        }
        res.status(200).send({
            success:true,
            message:"Password Updated Successfully",
            updateUserPassword
        }); 
    } catch (error) {
        return res.status(500).send("Server error:" + error);
    }
}

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
            options:{sort:{createdAt:-1}},
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

export const getRecomendedJobs=async(req,res)=>{
    try{
        const userId= req.id;
  const user=await User.findById(userId);//sirf prference job role aaega user ke saath in profile me
  if(!user){
    return res.status(404).json({
        success:false,
        message:'user not found'
    })
  }
  const {role1, role2,role3}=user.profile.preferredJobRole;
  let matchedJobs=await JobModel.find({
        $or:[{title:role1},{title:role2},{title:role3}]
  }).sort({createdAt:-1}).limit(10);
    user.recommendedJobs=matchedJobs.map(job=>job._id);  // Save only job IDs
   //user.profile.recommendedJobs=matchedJobs;  // Save only job IDs
await user.save();  // Save the updated recommendedJobs array to the user
res.json({success:true, jobs:matchedJobs});

    }
    catch(error){
        console.error('Error fetching and saving recommended jobs:', error);
    res.status(500).json({ success: false, message: 'Server error' ,error});
    }
}