import { Router } from "express";

const router = Router()

router.get('/', (req, res, next) => res.status(200).json('Ok 1.0.0'));


export default router;