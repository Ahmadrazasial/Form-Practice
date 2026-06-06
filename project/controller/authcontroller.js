import { User } from "../models/signupScema.js";
import logger from "../utils/logger.js";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import crypto from "crypto"
import mongoose from "mongoose";



export const signup = async (req, res) => {
    try {
        const fields = {}

        // await User.deleteMany();

        const { firstname, lastname, number, email, password } = req.body;

        logger.info(`Signup attempt for email: ${email}`);

        const phoneUser = await User.findOne({ phoneNumber: number }).select("phoneNumber");
        const emailUser = await User.findOne({ email: email.toLowerCase().trim() }).select("email");
        // console.log(eUser)    
        if (phoneUser) fields.phoneNumber = "Phone number already exists";
        if (emailUser) fields.email = "Email already exists"

        if (Object.keys(fields).length > 0) {
            return res.status(409).json({
                success: false,
                fields
            });
        }

        await User.create({
            firstname: firstname.trim(),
            lastname: lastname.trim(),
            phoneNumber: number.trim(),
            email: email.toLowerCase().trim(),
            password: password
        })
        logger.info(`User created successfully: ${email}`);
        return res.status(201).json({
            success: true,
            message: "Congratulations ! You have Successfully Signed Up"
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
                success: false,
                errors
            }
            )
        }
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            const errors = {}
            errors[field] = `${field} already exists`
            return res.status(409).json({
                success: false,
                errors
            }

            )

        }

        logger.error(`Signup failed for ${req.body.email}: ${error.message}`)
        return res.status(500).json({
            success: false,
            error
        })
    }
}

export const login = async (req, res) => {
    try {

        const errFields = {}
        const { email, phone, password } = req.body;

        logger.info(`Login attempt for email: ${email}`);
        async function loginAuthen(user, name, pass) {
            if (!user) {
                errFields.credients = `invalid ${name} / password`;
                return res.status(400).json({
                    success: false,
                    errFields
                })
            }
            else {
                // console.log("exist", user)
                const userPass = user.password
                const comparison = await bcrypt.compare(pass, userPass)
                if (!comparison) {
                    errFields.credients = `invalid ${name} / password`;
                    console.log(errFields)
                    return res.status(400).json({
                        success: false,
                        errFields
                    })
                }
                else {
                    console.log("matched")
                    logger.info(`User logged in successfully: ${user.id}`);

                    const userInfo = {
                        id: user.id,
                        role: "user"

                    }
                    if (name === "email") {
                        userInfo.user = user.email
                    } else {
                        userInfo.user = user.phoneNumber
                    }
                    const secret = process.env.JWT_SECRET
                    const token = jwt.sign(userInfo, secret, { expiresIn: '1d' });
                    res.cookie("token", token, {
                        httpOnly: true,
                        secure: false,
                        sameSite: "lax",
                        maxAge: 24 * 60 * 60 * 1000
                    })
                    return res.status(200).json({
                        success: true,
                        // token,
                        message: "You have successfully logged in"

                    })
                }

            }
        }

        if (email) {
            console.log(email)
            const userEmail = await User.findOne({ email: email.toLowerCase().trim() }).select()
            loginAuthen(userEmail, "email", password)


        } else {
            console.log(phone)
            const userPhone = await User.findOne({ phoneNumber: phone.trim() }).select()
            loginAuthen(userPhone, "phone", password)

        }


    } catch (error) {
        logger.error(`Login failed for ${req.body.email || req.body.phone}: ${error.message}`)
        return res.status(500).json({
            success: false,
            error
        })
    }
}

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        return res.status(200).json({
            success: true,
            user
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "server error"
        })
    }
}





export const forgot = async (req, res) => {
    try {

        async function sendLink(user) {
            const buffer = crypto.randomBytes(32);
            const token = buffer.toString('hex')
            const hash = crypto.createHash('sha256').update(token).digest('hex')
            const expiry = Date.now() + 15 * 60 * 1000

            user.resetPasswordToken = hash;
            user.resetPasswordExpiry = expiry;
            await user.save();

            console.log(token, "\n", hash)
        }

        const { email } = req.body;
        console.log(email)
        const userCheck = await User.findOne({ email: email.toLowerCase().trim() })
        console.log(userCheck)
        console.log(userCheck instanceof mongoose.Model);
// console.log(userCheck);
        if (!userCheck) {
            return res.status(400).json({
                success: false,
                message: "not found"
            })
        } else {
            await sendLink(userCheck)
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "server error" + error
        })
    }
}