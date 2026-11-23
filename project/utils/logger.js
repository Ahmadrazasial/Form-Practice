import winston from "winston";
import path from "path";
// import { error } from "console";

    const transports = [
        new winston.transports.Console(),
     
    ];

    if (process.env.NODE_ENV !== "production") {
    transports.push(
        new winston.transports.File({filename:path.join("logs","error.log"),level:"error"}),
        new winston.transports.File({filename:path.join("logs","combined.log")})
    );
}
    const logger = winston.createLogger({

    level:"info",
    format:winston.format.combine(
        winston.format.timestamp({format:"YYYY-MM-DD HH:MM:SS"}),
        winston.format.printf(
            ({level ,message, timestamp}) => `[${timestamp}] ${level.toUpperCase()} : ${message}`
        )
    ),
    transports
    
})
export default logger
