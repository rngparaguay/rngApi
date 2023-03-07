"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGame = exports.updateGame = exports.getOneGames = exports.getGames = exports.createGame = void 0;
const Games_1 = require("../entities/Games");
const createGame = async (req, res) => {
    try {
        const { name, genre_id, platform_id } = req.body;
        const game = new Games_1.Games();
        game.name = name;
        game.gameGenre = genre_id;
        game.platform = platform_id;
        await Games_1.Games.save(game);
        return res.json(game);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.createGame = createGame;
const getGames = async (req, res) => {
    try {
        const games = await Games_1.Games.find({
            relations: {
                gameGenre: true,
                platform: true
            },
        });
        return res.json(games);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.getGames = getGames;
const getOneGames = async (req, res) => {
    try {
        const { id } = req.params;
        const game = await Games_1.Games.findOneBy({ id: parseInt(id) });
        if (!game)
            return res.status(404).json({ message: "Game not found" });
        return res.json(game);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.getOneGames = getOneGames;
const updateGame = async (req, res) => {
    const { id } = req.params;
    try {
        const game = await Games_1.Games.findOneBy({ id: parseInt(id) });
        if (!game)
            return res.status(404).json({ message: "Game not found" });
        await Games_1.Games.update({ id: parseInt(id) }, req.body);
        return res.status(200).json({ message: "Game has been updated" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.updateGame = updateGame;
const deleteGame = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Games_1.Games.delete({ id: parseInt(id) });
        if (result.affected === 0)
            return res.status(404).json({ message: "Games not found" });
        return res.status(200).json({ message: "Games has been deleted" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.deleteGame = deleteGame;
