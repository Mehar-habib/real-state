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

const deleteListing = asyncHandler(async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) throw new ApiError(404, "listing not found");
    if (req.user.id !== listing.userRef)
        throw new ApiError(403, "you can only delete your own listing");

    try {
        await Listing.findByIdAndDelete(req.params.id);
        return res
            .status(200)
            .json(new ApiResponse(200, "listing deleted successfully"));
    } catch (error) {
        throw new ApiError(500, error.message);
    }
});

export { createListing, deleteListing };
