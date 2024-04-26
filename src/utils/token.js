import jwt from "jsonwebtoken";
import configObjet from "../config/dotenv.js";


const generatetoken =(user)=>{
    const token = jwt.sign({user},configObjet.private_key,{expiresIn:'1h'})
    return token
}



const authtoken=(req,res,next)=>{
    const authheader= req.headers.authorization;
    if (!authheader) return res.status(401).send({error:"not authenticated"})
    const token= authheader.split(' ')[1];
    
    jwt.verify(token,configObjet.private_key,(error,credentials)=>{
        if(error) return res.status(403).send({error:"not authorized"})
        req.user= credentials.user;
    next();
    })
}

export {generatetoken, authtoken} 