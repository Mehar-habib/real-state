import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    try {
        const token =
            req.cookies?.access_token ||
            req.header("Authorization").replace("Bearer ", "");
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
};
