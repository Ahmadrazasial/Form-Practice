import mongoose from "mongoose";
import bcrypt from "bcrypt";



const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })




userSchema.virtual('fullname').get(function () {
    return `${this.firstname} ${this.lastname}`;
})

const User = mongoose.model('user', userSchema);

export { User }