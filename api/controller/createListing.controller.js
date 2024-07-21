import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import Listing from "../models/listing.model.js";
import ApiResponse from "../utils/ApiResponse.js";

const createListing = asyncHandler(async (req, res) => {
    try {
        const listing = await Listing.create(req.body);
        return res
            .status(200)
            .json(
                new ApiResponse(200, listing, "listing created successfully")
            );
    } catch (error) {
        throw new ApiError(500, error.message);
    }
});

export { createListing };
