import { Router } from "express";
import { checkAdmin, createAlbum, createSong, deleteAlbum, deleteSong } from "../controllers/adminController";
import { protectRoute, requireAdmin } from './../middleware/authMiddleware';

const router = Router()

router.use(protectRoute, requireAdmin)

router.get('/check-admin', checkAdmin)
router.post('/create-song', createSong)
router.delete("/delete-song/:id", deleteSong)

router.post('/create-song', createAlbum)
router.post('/delete-album/:id', deleteAlbum)

export default router
