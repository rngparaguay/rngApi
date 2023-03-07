"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const User_1 = require("../entities/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = __importDefault(require("../config/auth"));
const authMiddleware = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: 'Token not provider' });
    }
    const [, token] = authorization.split(' ');
    if (!token) {
        return res.status(401).json({ error: 'invalid Token' });
    }
    try {
        const { id } = jsonwebtoken_1.default.verify(token, auth_1.default.secret);
        const user = await User_1.User.findOneBy({ id });
        if (!user) {
            return res.status(401).json({ error: 'User not authorized' });
        }
        const { password: _, ...loggedUser } = user;
        req.user = loggedUser;
        return next();
    }
    catch (error) {
        return res.status(401).json({ error: 'Token expired' });
    }
};
exports.authMiddleware = authMiddleware;
