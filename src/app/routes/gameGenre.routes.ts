import { Router } from "express";
import { createGameGenre, deleteGameGenre, getGameGenre, getOneGameGenre, updateGameGenre } from "../controllers/gameGenre.controllers";
import { authMiddleware } from "../middlewares/jwt";


const router = Router()
router.get('/getall', getGameGenre)

router.get('/getone/:id', getOneGameGenre)

router.use(authMiddleware)

router.post('/create', createGameGenre)

router.put('/update/:id',  updateGameGenre)

router.delete('/delete/:id', deleteGameGenre)

export default router;