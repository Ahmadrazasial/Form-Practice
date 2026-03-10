import { body, validationResult } from "express-validator";

export const loginValidator = [
    //email
    body("email").trim()
    .notEmpty().withMessage("Email is required")
    .isEmail()
    .withMessage("invalid email"),

    body("password").
    trim()
    .notEmpty()
    .withMessage("Password is requied"),

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