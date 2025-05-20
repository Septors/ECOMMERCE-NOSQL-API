import User from "../models/User.js";

export const checkMail = async (email) =>{
    return  await User.findOne({email});
};


export const createUser = async (email,hashPassword,role="user") =>{
    try{
        return await User.create({
            email,
            password:hashPassword,
            role,
        }
        )
    }catch(err){
        console.error(err);
    }
}
export const sendCookie = (res,nameCookie,cookie)=>{
    res.cookie(nameCookie,cookie,{
        httpOnly:true,
        secure:true,
        samSite:"Strict",
        maxAge:7*24*60*60*1000
    })
}

export const findUser = async(payload) =>{
    try{
        return await User.findById(payload);
    }catch(err){
        console.error(err);
    }
}