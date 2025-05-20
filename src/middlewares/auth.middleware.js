import * as token from "../utils/token.js";
import authValidateSchema from '../validators/auth.validators.js'

export const verifyAccessToken = async(req,res,next) =>{
    try{
    const authHeader = req.headers.authorization?.split(" ")[1];
    
    if(!authHeader){
        return res.status(404).json({Eror: "Access token not found"});
    };

    const decoded = await token.verifyToken(authHeader,process.env.ACCESS_SECRET);

    req.user = decoded.user;
    req.userRole = decoded.role;

    next();
}catch(err){
    console.error(err);
    res.status(500).json({Error: "Server error"});
};
};

export const validateMiddleware = async(req,res,next) => {
    try{
        const{error,value} = authValidateSchema.validate(req.body);

        if(error){
            console.log(error);
            return res.status(402).json({Error: 'Validate error'});
        }
        req.body = value;
        
        next();
    }catch(err){
        console.error(err);
        res.status(500).json({Error: "Server error"});
    };
};

export const checkRole = (currentRole) =>{
    return (req,res,next) =>{
        try{
        if(req.userRole !== currentRole){
           return res.status(401).json({Error: "Acces deinde"});
        };
        next()
    }catch(err){
        console.error(err);
        res.status(500).json({Error: "Server error"});
    };
    };
};