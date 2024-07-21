import { Router } from "express";
import { createListing } from "../controller/createListing.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/create", verifyToken, createListing);
export default router;
