import { NextFunction, Request, Response } from 'express'
import { User } from "../entities/User";
import jwt from 'jsonwebtoken'
import authConfig from "../config/auth";

type JwtPayload = {
    id: number
}


export const authMiddleware = async (
    req: any,
    res: Response,
    next: NextFunction
) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ error: 'Token not provider' });
    }

    const [, token] = authorization.split(' ');

    if (!token) {
        return res.status(401).json({ error: 'invalid Token' });
    }

    try {
        const { id } = jwt.verify(token, authConfig.secret) as JwtPayload

        const user = await User.findOneBy({ id })

        if (!user) {
            return res.status(401).json({ error: 'User not authorized' });
        }

        const { password: _, ...loggedUser } = user
        req.user = loggedUser
        return next();


    } catch (error) {
        return res.status(401).json({ error: 'Token expired' });
    }
}