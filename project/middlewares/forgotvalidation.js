import { body, validationResult } from "express-validator";


export const forgotValidator = [
    //email

    body("email").trim().optional()
    .notEmpty().withMessage("Email is required").bail()
    .isEmail()
    .withMessage("invalid email"),

    body("phone").
    trim().optional().
    notEmpty().withMessage("Phone number is required").bail().
    isLength(10).withMessage("Phone number must be 10 digits long"),
   
    

    body().custom((value)=>{
        if(!value.email && !value.phone){
            throw new Error("Either email or phone is required")
        }
        return true
    }),

(req , res , next)=>{
    const result = validationResult(req);

    if(!result.isEmpty()){
        const fields = {};
        result.array().forEach(r => {
            // console.log(r);
            
            fields[r.path] = r.msg
        });
        const validfields = {};
        return res.status(400).json({
            validfields:{
                success:false,
                fields
            }
            });
    }
    next();
}

]