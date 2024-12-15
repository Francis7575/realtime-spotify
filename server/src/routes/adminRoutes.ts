import { Router } from "express";
import { createSong } from "../controllers/adminController";
import { protectRoute, requireAdmin } from './../middleware/authMiddleware';

const router = Router()

router.post('/create-song', protectRoute, requireAdmin, createSong)

export default router
