"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTypeUser = exports.updateTypeUser = exports.getOneTypeUser = exports.getTypeUser = exports.createTypeUser = void 0;
const TypeUser_1 = require("../entities/TypeUser");
const createTypeUser = async (req, res) => {
    try {
        const { name } = req.body;
        const typeUser = new TypeUser_1.TypeUser();
        typeUser.name = name;
        await TypeUser_1.TypeUser.save(typeUser);
        return res.json(typeUser);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.createTypeUser = createTypeUser;
const getTypeUser = async (req, res) => {
    try {
        const typeUsers = await TypeUser_1.TypeUser.find();
        return res.json(typeUsers);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.getTypeUser = getTypeUser;
const getOneTypeUser = async (req, res) => {
    try {
        const { id } = req.params;
        const typeUser = await TypeUser_1.TypeUser.findOneBy({ id: parseInt(id) });
        if (!typeUser)
            return res.status(404).json({ message: 'Type user not found' });
        return res.json(typeUser);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.getOneTypeUser = getOneTypeUser;
const updateTypeUser = async (req, res) => {
    const { id } = req.params;
    try {
        const typeUser = await TypeUser_1.TypeUser.findOneBy({ id: parseInt(id) });
        if (!typeUser)
            return res.status(404).json({ message: "Type user not found" });
        await TypeUser_1.TypeUser.update({ id: parseInt(id) }, req.body);
        return res.status(200).json({ message: "Type user has been updated" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.updateTypeUser = updateTypeUser;
const deleteTypeUser = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await TypeUser_1.TypeUser.delete({ id: parseInt(id) });
        if (result.affected === 0)
            return res.status(404).json({ message: "Type user not found" });
        return res.status(200).json({ message: "Type user has been deleted" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.deleteTypeUser = deleteTypeUser;
