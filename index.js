import express from "express";
import mongoose from "mongoose";
import path from "path"
import { fileURLToPath } from "url";
import { User } from "./models/signupScema.js";
import bcrypt from "bcrypt";
import { console } from "inspector";

const app = express();
const port = 3000;

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

app.use(express.static(path.join(_dirname, "public")));
app.use(express.json());

const connect = await mongoose.connect("mongodb://localhost:27017/users");
connect.connection.db;
app.post("/signup", async (req, res) => {
    try {
        const { firstname, lastname, cCode, number, email, password } = req.body;
        const fields = {}

       const requiredFields = ["firstname","lastname","cCode","number","email","password"];

       for (const key of requiredFields) {
        if(!req.body[key] || req.body[key].toString().trim() === ""){
            fields[key] = `${key} is required`;
        }
       }
       if(Object.keys(fields).length > 0){
       return res.status(400).json({ fields });
       }
        const phone = `${cCode}${number}`;
        const phoneUser = await User.findOne({ phoneNumber: phone }).select("phoneNumber");
        const emailUser = await User.findOne({ email: email }).select("email");
        // console.log(eUser)    
        if (phoneUser) fields.phoneNumber = "phone number already exists";
        if (emailUser) fields.email = "email already exists"

        if(Object.keys(fields).length > 0){
       return res.status(400).json({ fields });
       }

        await User.create({
            firstname: firstname.trim(),
            lastname: lastname.trim(),
            phoneNumber: phone.trim(),
            email: email.toLowerCase().trim(),
            password: password
        })

        return res.status(201).json("Congratulations ! You have Successfully Signed Up")
    } catch (error) {
        console.error(error)
        if (error.name === "ValidationError") {

            const field = Object.keys(error.errors);
            const errors = {};
            field.forEach(input => {
                errors[input] = error.errors[input].message.split("Path")[1];
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