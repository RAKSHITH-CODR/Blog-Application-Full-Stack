import express from "express"
import dotenv from "dotenv" 
import connectDB from "./database/db.js";
import userRoute from "./route/user.route.js"
import blogRoute from "./route/blog.route.js"
import commentRoute from "./route/comment.route.js"
import cors from "cors"
import cookieParser from "cookie-parser";
import path from "path";
import _ from "lodash";

dotenv.config();

const app = express();

//defalut middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(cors())

const __dirname = path.resolve();

const PORT = process.env.PORT || 3000

app.use("/api/v1/user", userRoute)
app.use("/api/v1/blog", blogRoute)
app.use("/api/v1/comment", commentRoute)

app.use(express.static(path.join(__dirname, "/frontend/dist")))
// app.get("*",(_, res) => {
//     res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
// })

app.listen(PORT, () => {
    connectDB();
    console.log(`Server listen at port ${PORT}`);
});
