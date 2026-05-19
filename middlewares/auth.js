import jwt from "jsonwebtoken"

export const verifyToken = (req,res,next) =>{
    try{
        // const authHeader = req.headers.authorization;

        // if(!authHeader || !authHeader.startsWith("Bearer ")){
        //     return res.status(401).json({
        //         success:false,
        //         message:"No token provided"
        //     })
        // }


        const authToken = req.cookies.token;

        if(!authToken){
            return res.status(401).json({
                success:false,
                message:"No token provided"
            })
        }
        // const token = authToken.split(" ")[1];

        const decoded = jwt.verify(authToken,process.env.JWT_SECRET);

        req.user = decoded;

        next()

    }catch(error){
        return res.status(401).json({
            success: false,
            message: error
        });
    }
}