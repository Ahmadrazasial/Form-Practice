import { body, validationResult } from "express-validator";


export const otpValidator = [
    //OTP
    body("phone").optional(),
    body("otp").
    trim().
    notEmpty().withMessage("OTP is required").bail().
    isLength({min:6,max:6}).withMessage("OTP must be 6 digits long"),
   
    
(req , res , next)=>{
    const result = validationResult(req);

    if(!result.isEmpty()){
        const fields = {};
        result.array().forEach(r => {
            // console.log(r);
            fields[r.path] = r.msg
        });
        // console.log(fields)
        return res.status(400).json({fields});
    }
    next();
}

]