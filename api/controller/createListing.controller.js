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

const updateListing = asyncHandler(async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) throw new ApiError(404, "listing not found");

    if (req.user.id !== listing.userRef)
        throw new ApiError(403, "you can only update your own listing");
    try {
        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    updatedListing,
                    "listing updated successfully"
                )
            );
    } catch (error) {
        throw new ApiError(500, error.message);
    }
});

const getListing = asyncHandler(async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) throw new ApiError(404, "listing not found");
        return res
            .status(200)
            .json(new ApiResponse(200, listing, "listing found successfully"));
    } catch (error) {
        throw new ApiError(500, error.message);
    }
});

const getAllListings = asyncHandler(async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;
        let offer = req.query.offer;
        if (offer === undefined || offer === "false") {
            offer = { $in: [false, true] };
        }
        let furnished = req.query.furnished;
        if (furnished === undefined || furnished === "false") {
            furnished = { $in: [false, true] };
        }
        let parking = req.query.parking;
        if (parking === undefined || parking === "false") {
            parking = { $in: [false, true] };
        }
        let type = req.query.type;
        if (type === undefined || type === "all") {
            type = { $in: ["rent", "sale"] };
        }
        const searchTerm = req.query.searchTerm || "";
        const sort = req.query.sort || "createdAt";
        const order = req.query.order || "desc";

        const listings = await Listing.find({
            name: { $regex: searchTerm, $options: "i" },
            offer,
            furnished,
            parking,
            type,
        })
            .sort({ [sort]: order })
            .limit(limit)
            .skip(startIndex);

        return res
            .status(200)
            .json(
                new ApiResponse(200, listings, "listings fetched successfully")
            );
    } catch (error) {
        throw new ApiError(500, error.message);
    }
});

export {
    createListing,
    deleteListing,
    updateListing,
    getListing,
    getAllListings,
};
