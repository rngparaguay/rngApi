import { Request, Response } from "express";
import { GameGenre } from "../entities/GameGenre";
import { IGameGenreReq } from "../interfaces/IGameGenre";


export const createGameGenre = async (
    req: Request<unknown, unknown, IGameGenreReq>,
    res: Response
) => {
    try {

        const { description } = req.body;
        const gameGenre = new GameGenre();
        gameGenre.description = description;
        await gameGenre.save();
        return res.json(gameGenre);

    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};

export const getGameGenre = async (req: Request, res: Response) => {
    try {
        const gameGenres = await GameGenre.find();
        return res.json(gameGenres)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export const getOneGameGenre = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const gameGenre = await GameGenre.findOneBy({ id: parseInt(id) });

        if (!gameGenre) return res.status(404).json({ message: 'Genre not found' });

        return res.json(gameGenre);

    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export const updateGameGenre = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const gameGenre = await GameGenre.findOneBy({ id: parseInt(id) });

        if (!gameGenre) return res.status(404).json({ message: "Genre not found" });

        await GameGenre.update({ id: parseInt(id) }, req.body);

        return res.status(200).json({ message: "Genre has been updated" });

    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export const deleteGameGenre = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const result = await GameGenre.delete({ id: parseInt(id) });

        if (result.affected === 0)
            return res.status(404).json({ message: "Genre not found" });

        return res.status(200).json({ message: "Genre has been deleted" });

    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}