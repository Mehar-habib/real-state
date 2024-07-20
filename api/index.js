import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";

dotenv.config({
    path: "./.env",
});

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.log(error);
    });

const app = express();

app.use("/api/user", userRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000!!!");
});
