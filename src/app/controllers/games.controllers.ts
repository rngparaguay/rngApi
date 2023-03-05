import { Request, Response } from "express";
import { GameGenre } from "../entities/GameGenre";
import { Games } from "../entities/Games";
import { IGamesReq } from "../interfaces/IGames";

export const createGame = async (
  req: Request<unknown, unknown>,
  res: Response
) => {
  try {
    const { name, genre_id, platform_id } = req.body;

    const game = new Games();
    game.name = name;
    game.gameGenre = genre_id;
    game.platform = platform_id;
    await Games.save(game);
    return res.json(game);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getGames = async (req: Request, res: Response) => {
  try {
    const games = await Games.find({
      relations: {
        gameGenre: true,
        platform: true
      },
    });
    return res.json(games);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getOneGames = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const game = await Games.findOneBy({ id: parseInt(id) });

    if (!game) return res.status(404).json({ message: "Game not found" });

    return res.json(game);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const updateGame = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const game = await Games.findOneBy({ id: parseInt(id) });

    if (!game) return res.status(404).json({ message: "Game not found" });

    await Games.update({ id: parseInt(id) }, req.body);

    return res.status(200).json({ message: "Game has been updated" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const deleteGame = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await Games.delete({ id: parseInt(id) });

    if (result.affected === 0)
      return res.status(404).json({ message: "Games not found" });

    return res.status(200).json({ message: "Games has been deleted" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
