import { Router } from "express"
import {signupValidate } from "../middlewares/signupValidator.js";
import { verifyToken } from "../middlewares/auth.js";
import { loginValidator } from "../middlewares/loginvalidator.js";
import { forgotValidator } from "../middlewares/forgotvalidation.js";
import {signup,login,getProfile,forgot} from "../controller/authcontroller.js";
import { signupLimiter } from "../utils/ratelimit.js";

const router = Router();

router.post("/signup", signupValidate, signupLimiter,signup)

router.post("/login", loginValidator, login)



router.get("/profile", verifyToken, getProfile)

router.post("/forgot",forgotValidator,forgot)
export default router