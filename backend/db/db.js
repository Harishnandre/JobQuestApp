const mongoose=require('mongoose');

const db=async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database connected successfully");
    } catch (error) {
      console.log("The error in DB conection:",error);  
    }
} 

module.exports=db;