import { Router } from "express";
import { createTypeUser, deleteTypeUser, getOneTypeUser, getTypeUser, updateTypeUser } from "../controllers/typeUser.controllers";
import { authMiddleware } from "../middlewares/jwt";


const router = Router()

router.use(authMiddleware)

router.post('/create',createTypeUser)

router.get('/getall', getTypeUser)

router.get('/getone/:id', getOneTypeUser)

router.put('/update:id', updateTypeUser)

router.delete('/delete/:id', deleteTypeUser)

export default router;