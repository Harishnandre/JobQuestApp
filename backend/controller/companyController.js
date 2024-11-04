
import { Company } from "../models/companyModel.js";

export const createCompany=async(req,res)=>{
     try{
        const {name,description,website,location}=req.body;
        const recruiterId=req.id;
        const file=req.file;
        //Cloudinary work

        if(!name||!description||!website||!location||!recruiterId){
            return res.status(400).send({
                success:false,
                message:"All fields are required"
           }); 
        }
        const existCompany=await Company.findOne({name});
        if(existCompany){
            return res.status(400).send({
                success:false,
                message:"Company with similar name already exist"
           }); 
        }
        const company=new Company({
            name,
            description,
            website,
            location,
            recruiterId
        });
        const newCompany=await company.save();
        return res.status(201).send({
            success:true,
            message:"Company created successfullly",
            newCompany
        });
     }catch(error){
        return res.status(500).send("Server error:" + error);
     }
}

export const updateCompany=async(req,res)=>{
    try {
        const {name,description,website,location}=req.body;
        const _id=req.params.id;
        const file=req.file;
        //Cloudinary work

        const updatedData=await Company.findByIdAndUpdate(_id,{name,description,website,location},{new:true});
        if(!updatedData){
            return res.status(404).send({
                success:false,
                message:"Company not found while updating"    
            }); 
        }
        return res.status(200).send({
            success:true,
            message:"Company Updated Successfully",
            updatedData
        });
    } catch (error) {
        return res.status(500).send("Server error:" + error);  
    }
}

export const getCompanyById=async(req,res)=>{
    try {
        const _id=req.params.id;
        const company=await Company.findById({_id});
        if(!company){
            return res.status(404).send({
                success:false,
                message:"Company not found"    
            });
        }
        return res.status(200).send({
            success:true,
            company
        });
    } catch (error) {
        return res.status(500).send("Server error:" + error);   
    }
}

export const getAllCompanies=async(req,res)=>{
    try{
       const recruiterId=req.id;
       const companies=await Company.find({recruiterId});
       if(!companies){
        return res.status(404).send({
            success:false,
            message:"Company not found"    
        });
     }
    return res.status(200).send({
            success:true,
            companies
        });
    }catch (error) {
        return res.status(500).send("Server error:" + error);   
    }
};

export const deleteCompany=async(req,res)=>{
    try {
        const _id=req.params.id;
        const deletedComapny=await Company.findByIdAndDelete({_id});
        if(!deletedComapny){
            return res.status(404).send({
                success:false,
                message:"Company not found"    
            });
        }
        return res.status(200).send({
            success:true,
            message:"Company Deleted Successfylly"
        });
    } catch (error) {
        return res.status(500).send("Server error:" + error);   
    }
}