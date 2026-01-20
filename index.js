import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import path from "path"
import { fileURLToPath } from "url";
import { User } from "./models/signupScema.js";
import { signupValidate } from "./validators/signupValidator.js";
import ratelimit from "express-rate-limit";
import cors from "cors";
import logger from "./logger.js";

const app = express();
const port = process.env.HOST_PORT ;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors(
    {
        origin:`http://localhost:${port}/`,
        credentials:true
    }
))
app.use((req, res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  next();
});
const connect = await mongoose.connect(process.env.DB_URL);



const signupLimiter = ratelimit({
    windowMs:15 * 60 * 1000,
    max:30,
    message:{
        success :false,
        meassage : "Too many attemps.Please try agin later"
    }
})

app.post("/signup", signupValidate, signupLimiter,async (req, res) => {
    try {
        const fields = {}

        const { firstname, lastname, cCode, number, email, password } = req.body;

        logger.info(`Signup attempt for email: ${email}`);

        const phone = `${cCode}${number}`;
        const phoneUser = await User.findOne({ phoneNumber: phone }).select("phoneNumber");
        const emailUser = await User.findOne({ email: email.toLowerCase().trim()}).select("email");
        // console.log(eUser)    
        if (phoneUser) fields.phoneNumber = "Phone number already exists";
        if (emailUser) fields.email = "Email already exists"

        if (Object.keys(fields).length > 0) {
            return res.status(400).json({ fields });
        }

        await User.create({
            firstname: firstname.trim(),
            lastname: lastname.trim(),
            phoneNumber: phone.trim(),
            email: email.toLowerCase().trim(),
            password: password
        })
         logger.info(`User created successfully: ${email}`);
        return res.status(201).json({
            success: "Congratulations ! You have Successfully Signed Up"
        })
    } catch (error) {
        console.error(error)
        if (error.name === "ValidationError") {

            const field = Object.keys(error.errors);
            const errors = {};
            field.forEach(input => {
                errors[input] = error.errors[input].message;
            })
            return res.status(400).json({
                errors
            }
            )
        }
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            const errors = {}
            errors[field] = `${field} already exists`
            return res.status(400).json({
                errors
            }

            )

        }

            logger.error(`Signup failed for ${req.body.email}: ${error.message}`)
        return res.status(500).json({ error })
    }
})

app.listen(port, () => {
    console.log(`Server running on ${port}`);
})