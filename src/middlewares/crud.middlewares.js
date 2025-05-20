import crudSchema from "../validators/crud.validators.js";

export const crudValidate = (req,res,next) =>{
    try{
        const {error,value} = crudSchema.validate(req.body);
        if(error){return console.error(error)};
        req.body = value;
        next();
    }catch(err){
        console.error(err);
    };
};

