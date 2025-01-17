import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import listingRouter from "./routes/listing.routes.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config({
    path: "./.env",
});

app.use(express.json());
app.use(cookieParser());
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
app.use("/api/listing", listingRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000!!!");
});
