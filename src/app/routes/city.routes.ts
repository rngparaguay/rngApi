import { Router } from "express";
import { createCity, deleteCity, getCity, getOneCity, updateCity } from "../controllers/city.controllers";
import { authMiddleware } from "../middlewares/jwt";


const router = Router()

router.get('/getall', getCity)

router.use(authMiddleware)

router.get('/getone/:id', getOneCity)

router.post('/create', createCity)

router.put('/update/:id', updateCity)

router.delete('/delete/:id', deleteCity)

export default router;