import { Router } from "express";
import { createUser, deleteUser, getOneUser, getUsers, login, updateUser } from "../controllers/user.controllers";
import { authMiddleware } from "../middlewares/jwt";

const router = Router()

router.post('/create', createUser)

router.post('/login', login)

router.use(authMiddleware)

router.get('/getall', getUsers)

router.get('/getone/:id', getOneUser)

router.put('/update/:id', updateUser)

router.delete('/delete/:id', deleteUser)

export default router;