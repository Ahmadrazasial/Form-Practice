import ratelimit from "express-rate-limit";
export const signupLimiter = ratelimit({
    windowMs: 15 * 60 * 1000,
    max: 30,
    message: {
        success: false,
        meassage: "Too many attemps.Please try agin later"
    }
})