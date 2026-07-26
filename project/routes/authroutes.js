import { Router } from "express"
import {signupValidate } from "../middlewares/signupValidator.js";
import { verifyToken } from "../middlewares/auth.js";
import { loginValidator } from "../middlewares/loginvalidator.js";
import { forgotValidator } from "../middlewares/forgotvalidation.js";
import { resetValidate } from "../middlewares/resetValidation.js";
import {signup,login,getProfile,forgot,updatePass} from "../controller/authcontroller.js";
import { createLimiter } from "../utils/ratelimit.js";

const router = Router();

const signupLimiter = createLimiter(
    15 * 60 * 1000,
    30,
    "Too many attemps.Please try agin later"
)

const forgotLimiter = createLimiter(
    15 * 60 * 1000,
    3,
    "Too many attemps.Please try agin later"
)

const loginLimiter = createLimiter(
    15 * 60 * 1000,
    5,
    "Too many attemps.Please try agin later"
)

router.post("/signup", signupValidate, signupLimiter,signup)

router.post("/login", loginValidator, login)


router.get("/profile", verifyToken, getProfile)
router.post("/reset-password/:token",resetValidate,updatePass)

router.post("/forgot",forgotLimiter,forgotValidator,forgot)
export default router