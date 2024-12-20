import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
         // Retrieve token from cookies or Authorization header
        const token =req.cookies.token || req.body.token   || req.headers['authorization']?.split(" ")[1];
        if (!token) {
            return res.status(401).send({ // Change req to res
                success: false,
                message: "User not authenticated"
            });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY); 
        if (!decoded) {
            return res.status(403).send({ // Change req to res
                success: false,
                message: "Invalid token"
            });
        }  

        req.id = decoded.userId; // Assign userId to req object
        next();    
    } catch (error) {
        return res.status(500).json({ // Ensure consistent response structure
            success: false,
            message: "Server error: " + error.message // Send back the error message
        });  
    }
}

export default isAuthenticated;
