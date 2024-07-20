import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import bcryptjs from "bcryptjs";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const signup = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    try {
        await newUser.save();
        res.status(200).json(new ApiResponse(200, "user Created successfully"));
    } catch (error) {
        throw new ApiError(500, error.message);
    }
});

export { signup };
