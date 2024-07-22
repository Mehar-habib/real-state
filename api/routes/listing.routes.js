import { Router } from "express";
import {
    createListing,
    deleteListing,
    updateListing,
} from "../controller/createListing.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/create", verifyToken, createListing);
router.delete("/delete/:id", verifyToken, deleteListing);
router.post("/update/:id", verifyToken, updateListing);
export default router;
