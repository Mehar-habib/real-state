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

        return res
            .cookie("access_token", token, { httpOnly: true })
            .status(200)
            .json(new ApiResponse(200, others, "user logged in successfully"));
    } catch (error) {
        throw new ApiError(500, error.message);
    }
});

const google = asyncHandler(async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password, ...others } = user._doc;
            res.cookie("access_token", token, { httpOnly: true })
                .status(200)
                .json(
                    new ApiResponse(200, others, "user logged in successfully")
                );
        } else {
            const generatedPassword =
                Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
                username:
                    req.body.name.split(" ").join("").toLowerCase() +
                    Math.random().toString(36).slice(-4),
                email: req.body.email,
                password: hashedPassword,
                avatar: req.body.photo,
            });

            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password, ...others } = newUser._doc;
            return res
                .cookie("access_token", token, { httpOnly: true })
                .status(200)
                .json(
                    new ApiResponse(200, others, "user logged in successfully")
                );
        }
    } catch (error) {
        throw new ApiError(500, error.message);
    }
});

const signOut = asyncHandler(async (req, res) => {
    try {
        return res
            .status(200)
            .clearCookie("Access_token")
            .json({ message: "User Logged Out Successfully" });
    } catch (error) {
        throw new ApiError(500, error.message);
    }
});
export { signup, signin, google, signOut };
