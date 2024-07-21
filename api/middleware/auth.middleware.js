import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";

export const verifyToken = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.access_token;
        if (!token) {
            throw new ApiError(401, "unauthorized");
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                throw new ApiError(401, "unauthorized");
            }
            req.user = user;
            next();
        });
    } catch (error) {
        throw new ApiError(500, error.message);
    }
});
