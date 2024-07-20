import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import bcryptjs from "bcryptjs";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

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

const signin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            throw new ApiError(404, "user not found");
        }
        const validPassword = bcryptjs.compareSync(
            password,
            validUser.password
        );
        if (!validPassword) {
            throw new ApiError(401, "invalid credentials");
        }
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        // all things except the password
        const { password: pass, ...others } = validUser._doc;

        res.cookie("access_token", token, { httpOnly: true })
            .status(200)
            .json(new ApiResponse(200, others, "user logged in successfully"));
    } catch (error) {
        throw new ApiError(500, error.message);
    }
});
export { signup, signin };
