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

userSchema.pre("save", async function () {

    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    
})

userSchema.set("toJSON",(doc,ret)=>{
    delete ret.password
    return ret
})


const User = mongoose.model('user', userSchema);

export { User }