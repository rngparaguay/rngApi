import { Request, Response } from "express";
import { IPlatformReq } from "../interfaces/IPlatform";
import { Platform } from "../entities/Platform";

export const createPlatform = async (
    req: Request<unknown, unknown, IPlatformReq>,
    res: Response
) => {
    try {

        const { description } = req.body;
        const platform = new Platform();
        platform.description = description;
        await platform.save();
        return res.json(platform);

    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};

export const getPlatforms = async (req: Request, res: Response) => {
    try {
        const platforms = await Platform.find();
        return res.json(platforms)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export const getOnePlatform = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const platform = await Platform.findOneBy({ id: parseInt(id) });

        if (!platform) return res.status(404).json({ message: 'Platform not found' });

        return res.json(platform);

    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export const updatePlatform = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const platform = await Platform.findOneBy({ id: parseInt(id) });

        if (!platform) return res.status(404).json({ message: "Platform not found" });

        await Platform.update({ id: parseInt(id) }, req.body);

        return res.status(200).json({ message: "Platform has been updated" });

    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export const deletePlatform = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const result = await Platform.delete({ id: parseInt(id) });

        if (result.affected === 0)
            return res.status(404).json({ message: "Platform not found" });

        return res.status(200).json({ message: "Platform has been deleted" });

    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}