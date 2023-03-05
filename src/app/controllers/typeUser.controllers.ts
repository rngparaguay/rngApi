import { Request, Response } from "express";
import { TypeUser } from "../entities/TypeUser";
import { ITypeUserReq } from "../interfaces/ITypeUser";


export const createTypeUser = async (
    req: Request<unknown, unknown, ITypeUserReq>,
    res: Response
) => {
    try {

        const { name } = req.body;
        const typeUser = new TypeUser();
        typeUser.name = name;
        await TypeUser.save(typeUser);
        return res.json(typeUser);

    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};

export const getTypeUser = async (req: Request, res: Response) => {
    try {
        const typeUsers = await TypeUser.find();
        return res.json(typeUsers)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export const getOneTypeUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const typeUser = await TypeUser.findOneBy({ id: parseInt(id) });

        if (!typeUser) return res.status(404).json({ message: 'Type user not found' });

        return res.json(typeUser);

    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export const updateTypeUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const typeUser = await TypeUser.findOneBy({ id: parseInt(id) });

        if (!typeUser) return res.status(404).json({ message: "Type user not found" });

        await TypeUser.update({ id: parseInt(id) }, req.body);

        return res.status(200).json({ message: "Type user has been updated" });

    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export const deleteTypeUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const result = await TypeUser.delete({ id: parseInt(id) });

        if (result.affected === 0)
            return res.status(404).json({ message: "Type user not found" });

        return res.status(200).json({ message: "Type user has been deleted" });

    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}