import ApiError from "../utils/ApiError.js";
import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const test = (req, res) => {
    res.json({ message: "test" });
};

const updateUser = asyncHandler(async (req, res) => {
    if (req.user.id !== req.params.id)
        throw new ApiError(404, "you can only update your own account!");

    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }
        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    avatar: req.body.avatar,
                },
            },
            { new: true }
        );
        const { password, ...others } = updateUser._doc;
        res.status(200).json(
            new ApiResponse(200, others, "user updated successfully")
        );
    } catch (error) {
        throw new ApiError(500, error.message);
    }
});

const deleteUserAccount = asyncHandler(async (req, res) => {
    if (req.user.id !== req.params.id) {
        throw new ApiError(404, "you can only delete your own account!");
    }
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200)
            .clearCookie("access_token")
            .json(new ApiResponse(200, null, "user deleted successfully"));
    } catch (error) {
        throw new ApiError(500, error.message);
    }
});

export { test, updateUser, deleteUserAccount };
