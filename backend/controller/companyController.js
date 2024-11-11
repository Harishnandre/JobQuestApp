
import { Company } from "../models/companyModel.js";
import cloudinary from "../Cloudinary/cloudinary.js";
export const createCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const recruiterId = req.id;
        const logoFile = req.files.logo; // Access the file from `req.files` 
        if (!name || !description || !website || !location || !recruiterId || !logoFile) {
            return res.status(400).send({
                success: false,
                message: "All fields are required"
            });
        }
        // Check if the company already exists by same recruiter
        const existCompany = await Company.findOne({ name ,recruiterId});
        if (existCompany ) {
            return res.status(400).send({
                success: false,
                message: "Company with a similar name already exists"
            });
        }
    //Check if the company already exists but created by other recruiter then website must be same
    const webCompany = await Company.findOne({ website});
        if(webCompany&&webCompany.name!==name){
            return res.status(400).send({
                success: false,
                message: "You are giving wrong website for that company"
            });
        }
        // Upload logo to Cloudinary
        const result = await cloudinary.uploader.upload(logoFile.tempFilePath);
        if(!result){
            res.status(400).send({
                success:false,
                message:"Error in uploading logo of company:Cloudinary Error"
            });
        }
        // Create a new company with the uploaded logo URL
        const company = new Company({
            name,
            description,
            website,
            location: location.split(","),
            recruiterId,
            logo: result.secure_url // Store Cloudinary URL
        });
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
export const updateCompany=async(req,res)=>{
    try {
        const {name,description,website,location,logo}=req.body;
        const _id=req.params.id;
        const recruiterId=req.id;
        const logoFile = req.files.logo; // Access the file from `req.files` 
        if (!name || !description || !website || !location || !logoFile) {
            return res.status(400).send({
                success: false,
                message: "All fields are required for Updating"
            });
        }
    //Check if the company already exists but created by other recruiter then website must be same
    const webCompany = await Company.findOne({ website});
        if(webCompany&&webCompany.name!==name){
            return res.status(400).send({
                success: false,
                message: "The website you provided is matched with other company's website"
            });
        }
        //Cloudinary work
        const result = await cloudinary.uploader.upload(logoFile.tempFilePath);
        if(!result){
            res.status(400).send({
                success:false,
                message:"Error in uploading logo of company:Cloudinary Error"
            });
        }
        const newLocation=location.split(",");
        const updatedData=await Company.findByIdAndUpdate(_id,{name,description,website,location:newLocation,logo:result.secure_url},{new:true});
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
       const keyword=req.query.keyword || "";
       const query={
          recruiterId,
          $or:[
                  {name:{$regex:keyword,$options:"i"}},
                  {description:{$regex:keyword,$options:"i"}}
              ]
          }
       const companies=await Company.find(query).sort({createdAt:-1});
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