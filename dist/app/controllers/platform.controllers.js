"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePlatform = exports.updatePlatform = exports.getOnePlatform = exports.getPlatforms = exports.createPlatform = void 0;
const Platform_1 = require("../entities/Platform");
const createPlatform = async (req, res) => {
    try {
        const { description } = req.body;
        const platform = new Platform_1.Platform();
        platform.description = description;
        await platform.save();
        return res.json(platform);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.createPlatform = createPlatform;
const getPlatforms = async (req, res) => {
    try {
        const platforms = await Platform_1.Platform.find();
        return res.json(platforms);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.getPlatforms = getPlatforms;
const getOnePlatform = async (req, res) => {
    try {
        const { id } = req.params;
        const platform = await Platform_1.Platform.findOneBy({ id: parseInt(id) });
        if (!platform)
            return res.status(404).json({ message: 'Platform not found' });
        return res.json(platform);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.getOnePlatform = getOnePlatform;
const updatePlatform = async (req, res) => {
    const { id } = req.params;
    try {
        const platform = await Platform_1.Platform.findOneBy({ id: parseInt(id) });
        if (!platform)
            return res.status(404).json({ message: "Platform not found" });
        await Platform_1.Platform.update({ id: parseInt(id) }, req.body);
        return res.status(200).json({ message: "Platform has been updated" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.updatePlatform = updatePlatform;
const deletePlatform = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Platform_1.Platform.delete({ id: parseInt(id) });
        if (result.affected === 0)
            return res.status(404).json({ message: "Platform not found" });
        return res.status(200).json({ message: "Platform has been deleted" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.deletePlatform = deletePlatform;
