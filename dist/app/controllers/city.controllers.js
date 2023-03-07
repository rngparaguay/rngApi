"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCity = exports.updateCity = exports.getOneCity = exports.getCity = exports.createCity = void 0;
const City_1 = require("../entities/City");
const createCity = async (req, res) => {
    try {
        const { name, state_id } = req.body;
        const city = new City_1.City();
        city.name = name;
        city.state = state_id;
        await City_1.City.save(city);
        return res.json(city);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.createCity = createCity;
const getCity = async (req, res) => {
    try {
        const cities = await City_1.City.find({
            relations: {
                state: true,
            },
        });
        return res.json(cities);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.getCity = getCity;
const getOneCity = async (req, res) => {
    try {
        const { id } = req.params;
        const city = await City_1.City.findOneBy({ id: parseInt(id) });
        if (!city)
            return res.status(404).json({ message: "City not found" });
        return res.json(city);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.getOneCity = getOneCity;
const updateCity = async (req, res) => {
    const { id } = req.params;
    try {
        const city = await City_1.City.findOneBy({ id: parseInt(id) });
        if (!city)
            return res.status(404).json({ message: "City not found" });
        await City_1.City.update({ id: parseInt(id) }, req.body);
        return res.status(200).json({ message: "City has been updated" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.updateCity = updateCity;
const deleteCity = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await City_1.City.delete({ id: parseInt(id) });
        if (result.affected === 0)
            return res.status(404).json({ message: "City not found" });
        return res.status(200).json({ message: "City has been deleted" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.deleteCity = deleteCity;
