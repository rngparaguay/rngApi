import { Router } from "express";
import { createProfile, deleteProfile, getOneProfile, getProfiles, updateProfile } from "../controllers/profile.controllers";
import { authMiddleware } from "../middlewares/jwt";

const router = Router()

router.post('/create', createProfile)

/* router.use(authMiddleware) */

router.get('/getall', getProfiles)

router.get('/getone/:id', getOneProfile)

router.put('/update/:id', updateProfile)

router.delete('/delete/:id', deleteProfile)

export default router;