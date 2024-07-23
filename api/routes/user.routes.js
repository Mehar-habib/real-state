import { Router } from "express";
import {
    deleteUserAccount,
    test,
    updateUser,
    getAllUserListings,
    getUser,
} from "../controller/user.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/test", test);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUserAccount);
router.get("/listings/:id", verifyToken, getAllUserListings);
router.get("/:id", verifyToken, getUser);

export default router;
