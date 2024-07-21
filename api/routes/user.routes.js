import { Router } from "express";
import { test, updateUser } from "../controller/user.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/test", test);
router.post("/update/:id", verifyToken, updateUser);

export default router;
