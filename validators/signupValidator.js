import { body ,validationResult } from "express-validator";

export const signupValidate = [
    //firstname
    body("firstname").
    trim().
    notEmpty().
    withMessage("Firstname is required").
    escape(),

    //lastname
    body("lastname").
    trim().
    notEmpty().
    withMessage("Lastname is required").
    escape(),

    //Country code

    //Phone Number
    body("number").
    trim().
    notEmpty().withMessage("Phone number is required").
    isLength(6).withMessage("Phone number must be 7 digits long"),

    //Email
    body("email").trim()
    .notEmpty().withMessage("email is required")
    .toLowerCase()
    .isEmail().withMessage("Invalid email.Please enter a valid email address"),
    
    //Password
    body("password")
    .trim()
    .notEmpty().withMessage("Password is required")
    .isStrongPassword(
        {
            minLength:8,
            minLowercase:1,
            minUppercase:1,
            minNumbers:1,
            minSymbols:1
        })
        .withMessage("Password must contain a lowerrcase letter , an uppercase letter , a number and a symbol and must be 8 characters long long"),

        (req,res,next)=>{

            const result = validationResult(req);
            if(!result.isEmpty()){
                const fields = {}
                result.array().forEach(r => {
                    fields[r.path] = r.msg 
                });
                return res.status(400).json({
                fields
            });
            }
           next();
        }
]