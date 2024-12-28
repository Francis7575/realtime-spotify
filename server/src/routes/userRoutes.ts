import { Router } from "express";
import { protectRoute } from "../middleware/authMiddleware";
import { getAllUsers } from "../controllers/userController";

const router = Router();

router.get("/", protectRoute, getAllUsers)

export default router;