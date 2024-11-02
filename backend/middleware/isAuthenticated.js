import jwt from "jsonwebtoken";

const isAuthenticated=async(req,res,next)=>{
    try {
        const token=req.cookies.token;
        if(!token){
            return req.status(400).send({
                   success:false,
                   message:"User not Authenticated" 
                });
            }
        const decode=jwt.verify(token,process.env.SECRET_KEY); 
        if(!decode){
            return req.status(400).send({
                   success:false,
                   message:"Invalid Token" 
                });
            }  
         req.id=decode.userId;
         next();    
    } catch (error) {
        return res.status(500).send("Server error:" + error);  
    }
}

export default isAuthenticated;