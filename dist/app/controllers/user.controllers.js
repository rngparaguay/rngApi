"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.deleteUser = exports.updateUser = exports.getOneUser = exports.getUsers = exports.createUser = void 0;
const User_1 = require("../entities/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = __importDefault(require("../config/auth"));
const createUser = async (req, res) => {
    try {
        const { email, password, profile_id, type_user_id } = req.body;
        const hashPassword = await bcrypt_1.default.hash(password, 10);
        const user = new User_1.User();
        user.email = email;
        user.password = hashPassword;
        user.profile = profile_id;
        user.typeUser = type_user_id;
        const userExists = await User_1.User.findOneBy({ email });
        if (!userExists) {
            await User_1.User.save(user);
            return res.json(user);
        }
        else {
            return res.status(500).json({ message: 'User Already Exists' });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.createUser = createUser;
const getUsers = async (req, res) => {
    try {
        const users = await User_1.User.find({
            relations: {
                profile: true,
                typeUser: true
            }
        });
        return res.json(users);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.getUsers = getUsers;
const getOneUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User_1.User.findOne({
            where: {
                id: parseInt(id)
            }, relations: {
                profile: true
            }
        });
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        return res.json(user);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.getOneUser = getOneUser;
const updateUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User_1.User.findOneBy({ id: parseInt(id) });
        if (!user)
            return res.status(404).json({ message: "User not found" });
        await User_1.User.update({ id: parseInt(id) }, req.body);
        return res.status(200).json({ message: "User has been updated" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await User_1.User.delete({ id: parseInt(id) });
        if (result.affected === 0)
            return res.status(404).json({ message: "User not found" });
        return res.status(200).json({ message: "User has been deleted" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.deleteUser = deleteUser;
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User_1.User.findOneBy({ email });
    if (!user) {
        return res.status(401).json({ error: 'User not found' });
    }
    const verifyPass = await bcrypt_1.default.compare(password, user.password);
    if (!verifyPass) {
        return res.status(401).json({ error: 'Invalid Password' });
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id }, auth_1.default.secret, {
        expiresIn: '8h',
    });
    const { password: _, ...userLogin } = user;
    return res.json({
        user: userLogin,
        token: token,
    });
};
exports.login = login;
