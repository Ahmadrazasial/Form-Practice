import ratelimit from "express-rate-limit";
const fields = {}
export const createLimiter = (ms,max,msg)=>{
    fields.message = msg
    fields.success = false;
return ratelimit({
    windowMs: ms,
    max: max,
    message: {
      
        fields
    }
})
}