"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteState = exports.updateState = exports.getOneState = exports.getState = exports.createState = void 0;
const State_1 = require("../entities/State");
const createState = async (req, res) => {
    try {
        const { name } = req.body;
        const state = new State_1.State();
        state.name = name;
        await State_1.State.save(state);
        return res.json(state);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.createState = createState;
const getState = async (req, res) => {
    try {
        const states = await State_1.State.find();
        return res.json(states);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.getState = getState;
const getOneState = async (req, res) => {
    try {
        const { id } = req.params;
        const state = await State_1.State.findOneBy({ id: parseInt(id) });
        if (!state)
            return res.status(404).json({ message: 'State not found' });
        return res.json(state);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.getOneState = getOneState;
const updateState = async (req, res) => {
    const { id } = req.params;
    try {
        const state = await State_1.State.findOneBy({ id: parseInt(id) });
        if (!state)
            return res.status(404).json({ message: "State not found" });
        await State_1.State.update({ id: parseInt(id) }, req.body);
        return res.status(200).json({ message: "State has been updated" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.updateState = updateState;
const deleteState = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await State_1.State.delete({ id: parseInt(id) });
        if (result.affected === 0)
            return res.status(404).json({ message: "State not found" });
        return res.status(200).json({ message: "State has been deleted" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.deleteState = deleteState;
