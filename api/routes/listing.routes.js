import { Router } from "express";
import {
    createListing,
    deleteListing,
} from "../controller/createListing.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/create", verifyToken, createListing);
router.delete("/delete/:id", verifyToken, deleteListing);
export default router;
