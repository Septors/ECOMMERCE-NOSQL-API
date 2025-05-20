import jwt from "jsonwebtoken";

export const generate  =  (payload) => {
    const accessToken = jwt.sign(payload,process.env.ACCESS_SECRET,{expiresIn: "1d"});
    const refreshToken = jwt.sign(payload,process.env.REFRESH_SECRET,{expiresIn: "7d"});
    return {accessToken,refreshToken};
};

export const verifyToken = (token,secret) =>{
    return jwt.verify(token,secret)
};