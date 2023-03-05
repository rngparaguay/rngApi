import { Router } from "express";
import { createGame, deleteGame, getGames, getOneGames, updateGame } from "../controllers/games.controllers";
import { authMiddleware } from "../middlewares/jwt";



const router = Router()

router.get('/getall', getGames)

router.get('/getone/:id', getOneGames)

router.use(authMiddleware)

router.post('/create', createGame)

router.put('/update/:id', updateGame)

router.delete('/delete/:id', deleteGame)

export default router;