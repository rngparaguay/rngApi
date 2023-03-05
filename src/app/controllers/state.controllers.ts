import { Request, Response } from "express";
import { State } from "../entities/State";
import { IStateReq } from "../interfaces/IState";


export const createState = async (
    req: Request<unknown, unknown, IStateReq>,
    res: Response
) => {
    try {

        const { name } = req.body;
        const state = new State();
        state.name = name;
        await State.save(state);
        return res.json(state);

    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};

export const getState = async (req: Request, res: Response) => {
    try {
        const states = await State.find();
        return res.json(states)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export const getOneState = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const state = await State.findOneBy({ id: parseInt(id) });

        if (!state) return res.status(404).json({ message: 'State not found' });

        return res.json(state);

    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export const updateState = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const state = await State.findOneBy({ id: parseInt(id) });

        if (!state) return res.status(404).json({ message: "State not found" });

        await State.update({ id: parseInt(id) }, req.body);

        return res.status(200).json({ message: "State has been updated" });

    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export const deleteState = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const result = await State.delete({ id: parseInt(id) });

        if (result.affected === 0)
            return res.status(404).json({ message: "State not found" });

        return res.status(200).json({ message: "State has been deleted" });

    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}