import { Router } from "express";
import { getAdmin } from "../controllers/adminController";

const router = Router()

router.get('/', getAdmin)

export default router
