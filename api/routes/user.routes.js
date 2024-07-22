import { Router } from "express";
import {
    deleteUserAccount,
    test,
    updateUser,
    getAllUserListings,
} from "../controller/user.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/test", test);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUserAccount);
router.get("/listings/:id", verifyToken, getAllUserListings);

export default router;
