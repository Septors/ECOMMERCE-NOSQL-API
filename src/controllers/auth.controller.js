import { decode } from "jsonwebtoken";
import * as authService from "../services/auth.services.js";
import * as hash from "../utils/hash.js";
import * as token from "../utils/token.js";


export const registerUser = async(req,res) =>{
    try{
        const {email,password} = req.body;
        if(await  authService.checkMail(email)){
            return res.status(401).json({Error: "User exist"});
        }
        const hashPassword = await hash.generate(password);

        const user = await authService.createUser(email,hashPassword);

        const {accessToken,refreshToken} = token.generate({user:user._id,role:user.role});

        authService.sendCookie(res,"refreshToken",refreshToken);

        res.status(201).json({Message: "User create",accessToken});
    }catch(err){
        console.error(err);
        res.status(500).json({Error: "Server error"});
    }
}

export const login = async(req,res) => {
    try{
        const {email,password} = req.body;
        
        const exist =  await authService.checkMail(email);
        if(!exist){
            return res.status(401).json({Error: "Invalid value"});
        };

        const checkPassword = await hash.compare(password,exist.password);

        if(!checkPassword){
            return res.status(401).json({Error: "Invalid value"});
        };

        const {accessToken,refreshToken} = await token.generate({user:exist._id,role:exist.role});

        authService.sendCookie(res,"refreshToken",refreshToken);     

        res.status(200).json({Message: "Acces gived",exist,accessToken});
    }catch(err){
        console.error(err);
        res.status(500).json({Error: "Server error"});
    }
}

export const logout = async(req,res) =>{
    try{
        res.clearCookie("refreshToken");
        res.status(200).json({Message: "Logout succesgull"})
    }catch(err){
        console.error(err);
        res.status(500).json({Message: "Server Error"});
    }
}

export const refresh = async(req,res) =>{
    try{
        const authBearer = req.cookies.refreshToken;

        const decoded = token.verifyToken(authBearer,process.env.REFRESH_SECRET);
        if(!decoded){
            return res.status(404).json({Error: "Access denied"});
        };

        const {accessToken,refreshToken} = await token.generate({user:decoded.user,role:decoded.role});

        authService.sendCookie(res,"refreshToken",refreshToken);

        res.status(200).json({Message: "Token refreshed",accessToken});
    }catch(err){
        console.error(err);
        res.status(500).json({Error: "Server error"});
    }
}

export const changePassword = async(req,res) =>{
    try{
        const userId = req.user;
        const {newPassword,oldPassword} =req.body;

        const user = await authService.findUser(userId);

        const verifyPassword = await hash.compare(oldPassword,user.password);

        if(!verifyPassword){
            return res.status(401).json({Error: "incorrtct password"});
        };

        const currentPassword = await hash.generate(newPassword);

        user.password = currentPassword;
        user.save();
        res.status(200).json({Message: "Password is changed"});
    }catch(err){
        console.error(err);
        res.status(500).json({Error: "Server error"});
    }
}