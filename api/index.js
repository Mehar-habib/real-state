import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";

const app = express();
dotenv.config({
    path: "./.env",
});

app.use(express.json());
mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.log(error);
    });

// ! routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000!!!");
});
