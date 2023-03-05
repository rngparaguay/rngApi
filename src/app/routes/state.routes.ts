import { Router } from "express";
import { createState, deleteState, getOneState, getState, updateState } from "../controllers/state.controllers";
import { authMiddleware } from "../middlewares/jwt";


const router = Router()

router.get('/getall', getState)

router.get('/getone/:id', getOneState)

router.use(authMiddleware)

router.post('/create', createState)

router.put('/update:id', updateState)

router.delete('/delete/:id', deleteState)

export default router;