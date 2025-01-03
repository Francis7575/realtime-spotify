import { Router } from "express";
import { protectRoute } from "../middleware/authMiddleware";
import { getAllUsers, getMessages } from "../controllers/userController";

const router = Router();

router.get("/", protectRoute, getAllUsers)
router.get("/messages/:userId", protectRoute, getMessages);

export default router;