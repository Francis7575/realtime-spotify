import { protectRoute, requireAdmin } from './../middleware/authMiddleware';
import { Router } from "express";
import { getAllSongs, getFeaturedSongs, getMadeForYouSongs, getTrendingSongs } from "../controllers/songController";

const router = Router()

router.get('/', protectRoute, requireAdmin, getAllSongs)
router.get('/featured', getFeaturedSongs)
router.get('/made-for-you', getMadeForYouSongs)
router.get('/trending', getTrendingSongs)

export default router
