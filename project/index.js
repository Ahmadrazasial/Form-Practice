import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import path from "path"
import { fileURLToPath } from "url";
import cors from "cors";
import router from "./routes/authroutes.js";
import cookieParser from "cookie-parser";
import logger from "./utils/logger.js";
const app = express();
const port = process.env.HOST_PORT;
// console.log(port)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors(
    {
        origin: `http://localhost:${port}`,
        credentials: true
    }
))
app.use((req, res, next) => {
    logger.info(`Incoming request: ${req.method} ${req.url}`);
    next();
});

const connect = await mongoose.connect(process.env.DB_URL);
// app.get("/", (req, res) => {
//     res.send("API running");
// });

app.use(cookieParser());
app.use("/api/auth/", router)
app.listen(port, () => {
    console.log(`Server running on ${port}`);
})
console.log("working")
