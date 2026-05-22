import { body, validationResult } from "express-validator";


export const loginValidator = [
    //email

    body("email").optional().trim()
    .notEmpty().withMessage("Email is required")
    .isEmail()
    .withMessage("invalid email"),

    body("phone").optional().
    trim().
    notEmpty().withMessage("Phone number is required").
    isLength(6).withMessage("Phone number must be 7 digits long"),
   
    body("password").
    trim()
    .notEmpty()
    .withMessage("Password is requied"),

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
        return res.status(400).json({fields});
    }
    next();
}

]