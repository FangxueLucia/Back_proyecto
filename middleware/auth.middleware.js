
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function authMiddleware(req, res, next){
    const url = req.originalUrl;
    
    try{
        const authHeader = req.headers.authorization;
        
        if (!authHeader) {
            console.error("Fallo de autenticación, devolviendo 401.");
            return res.status(401).send("Invalid token: Header missing");
        }
        
        const token = authHeader.split(" ")[1]; 
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(err){
        console.error("Fallo de autenticación, devolviendo 401.");
        res.status(401).send("Invalid token");
    }
}
