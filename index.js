import express from "express";
import mongoose from "mongoose";
import path from "path"
import { fileURLToPath } from "url";
import { User } from "./models/signupScema.js";
import { body ,validationResult } from "express-validator";


const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

const connect = await mongoose.connect("mongodb://localhost:27017/users");
app.post("/signup", [
    body('firstname').trim().isLength({ min: 1 }).withMessage('First name is required').isAlpha().withMessage('First name must contain only letters'),
    body('lastname').trim().isLength({ min: 1 }).withMessage('Last name is required').isAlpha().withMessage('Last name must contain only letters'),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { firstname, lastname, cCode, number, email, password } = req.body;
        const fields = {}

        const requiredFields = ["cCode", "number", "email", "password"];

        for (const key of requiredFields) {
            if (!req.body[key] || req.body[key].toString().trim() === "") {
                fields[key] = `${key} is required`;
            }
        }
        if (Object.keys(fields).length > 0) {
            return res.status(400).json({ fields });
        }
        const phone = `${cCode}${number}`;
        if (phone.length < 8) {
            fields.phoneNumber = "The Phone Number must be 8 characters long"
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            fields.email = "Invalid email.Please enter a valid email address"
        }

        const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;

        if(!passRegex.test(password)){
            fields.password = "Password must contain a lowercase letter , an uppercase letter , a digit and a special character and should be 8 characters long";
        }

        const phoneUser = await User.findOne({ phoneNumber: phone }).select("phoneNumber");
        const emailUser = await User.findOne({ email: email }).select("email");
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

        return res.status(201).json( {
            success:"Congratulations ! You have Successfully Signed Up"
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

        return res.status(500).json({ error })
    }
})

app.listen(port, () => {
    console.log(`Server running on ${port}`);
})