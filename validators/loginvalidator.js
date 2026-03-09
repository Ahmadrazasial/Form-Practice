import { body, validationResult } from "express-validator";

const loginValidator = [
    //email
    body("email").trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("invalid email"),

    body("password").
    trim()
    .notEmpty()
    .withMessage("Email is requied"),

]