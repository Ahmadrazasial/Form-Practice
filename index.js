import express from "express";
import mongoose from "mongoose";
import path from "path"
import { fileURLToPath } from "url";
import { User }  from "./models/signupScema.js";

const app = express();
const port = 3000;

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

app.use(express.static(path.join(_dirname,"public")));
app.use(express.json());

const connect = await mongoose.connect("mongodb://localhost:27017/users");
connect.connection.db;
app.post("/signup" , async (req,res)=>{ 
    try {
        const {firstname ,lastname , cCode ,number,email,password} = req.body;

        const phone = `${cCode}${number}`;
        console.log()
        await User.create({
            firstname:firstname,
            lastname:lastname,
            phoneNumber:phone,
            email:email,
            password:password
        })

     res.status(201).json("Congratulations ! You have Successfully Signed Up")
    } catch (error) {
        // console.error((error.keyValue))
       if(error._message === "user validation failed"){
            const field = Object.keys(error.errors);
             res.status(400).json(
                `${field}`
            )
        }
        if(error.code === 11000){
            const field = Object.values(error.keyValue);
             res.status(400).json(
                
                    `${field} alredy exists`
                
            )
        }
        console.error(error)
         res.status(500).json({message:"server error" + error})
    }
})

app.listen(port,()=>{
    console.log(`Server running on ${port}`);   
})