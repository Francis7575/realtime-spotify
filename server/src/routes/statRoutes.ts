import { protectRoute, requireAdmin } from './../middleware/authMiddleware';
import { Router } from "express";
import { getStats } from "../controllers/statController";

const router = Router()

router.get('/', protectRoute, requireAdmin, getStats)

export default router
