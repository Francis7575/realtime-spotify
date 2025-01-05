import { protectRoute, requireAdmin } from './../middleware/authMiddleware';
import { Router } from "express";
import { getAllMadeForYouSongs, getAllSongs, getAllTrendingSongs, getFeaturedSongs, getMadeForYouSongs, getTrendingSongs } from "../controllers/songController";

const router = Router()

router.get('/', protectRoute, requireAdmin, getAllSongs)
router.get('/featured', getFeaturedSongs)
router.get('/made-for-you', getMadeForYouSongs)
router.get('/all-made-for-you', getAllMadeForYouSongs)
router.get('/trending', getTrendingSongs)
router.get('/all-trending', getAllTrendingSongs)

export default router
