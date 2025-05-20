import bcrypt from "bcrypt";

export const generate = async(password) =>{
    try{
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password,salt);
    }catch(err){
        console.error(err);
    };
};

export const compare = async (password,hashedPassword) =>{
    try{
        return await bcrypt.compare(password,hashedPassword);
    }catch(err){
        console.error(err);
    }
}
