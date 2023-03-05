import { Router } from "express";
import { createPlatform, deletePlatform, getOnePlatform, getPlatforms, updatePlatform } from "../controllers/platform.controllers";
import { authMiddleware } from "../middlewares/jwt";

const router = Router()

router.get('/getall', getPlatforms)

router.get('/getone/:id', getOnePlatform)

router.use(authMiddleware)

router.post('/create', createPlatform)

router.put('/update/:id', updatePlatform)

router.delete('/delete/:id', deletePlatform)

export default router;