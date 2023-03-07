"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGameGenre = exports.updateGameGenre = exports.getOneGameGenre = exports.getGameGenre = exports.createGameGenre = void 0;
const GameGenre_1 = require("../entities/GameGenre");
const createGameGenre = async (req, res) => {
    try {
        const { description } = req.body;
        const gameGenre = new GameGenre_1.GameGenre();
        gameGenre.description = description;
        await gameGenre.save();
        return res.json(gameGenre);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.createGameGenre = createGameGenre;
const getGameGenre = async (req, res) => {
    try {
        const gameGenres = await GameGenre_1.GameGenre.find();
        return res.json(gameGenres);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.getGameGenre = getGameGenre;
const getOneGameGenre = async (req, res) => {
    try {
        const { id } = req.params;
        const gameGenre = await GameGenre_1.GameGenre.findOneBy({ id: parseInt(id) });
        if (!gameGenre)
            return res.status(404).json({ message: 'Genre not found' });
        return res.json(gameGenre);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.getOneGameGenre = getOneGameGenre;
const updateGameGenre = async (req, res) => {
    const { id } = req.params;
    try {
        const gameGenre = await GameGenre_1.GameGenre.findOneBy({ id: parseInt(id) });
        if (!gameGenre)
            return res.status(404).json({ message: "Genre not found" });
        await GameGenre_1.GameGenre.update({ id: parseInt(id) }, req.body);
        return res.status(200).json({ message: "Genre has been updated" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.updateGameGenre = updateGameGenre;
const deleteGameGenre = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await GameGenre_1.GameGenre.delete({ id: parseInt(id) });
        if (result.affected === 0)
            return res.status(404).json({ message: "Genre not found" });
        return res.status(200).json({ message: "Genre has been deleted" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.deleteGameGenre = deleteGameGenre;
