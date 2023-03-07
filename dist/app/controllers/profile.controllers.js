"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProfile = exports.updateProfile = exports.getOneProfile = exports.getProfiles = exports.createProfile = void 0;
const Profile_1 = require("../entities/Profile");
const uuid_1 = require("uuid");
const createProfile = async (req, res) => {
    try {
        const { name, surname, age, bornDate, city_id, games, document, nick, gender } = req.body;
        const profile = new Profile_1.Profile();
        profile.name = name;
        profile.surname = surname;
        profile.age = age;
        profile.bornDate = bornDate;
        profile.city = city_id;
        profile.games = games;
        profile.document = document;
        profile.nick = nick,
            profile.gender = gender;
        profile.nickNumber = (0, uuid_1.v4)();
        await Profile_1.Profile.save(profile);
        return res.json(profile);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.createProfile = createProfile;
const getProfiles = async (req, res) => {
    try {
        const profiles = await Profile_1.Profile.find({
            relations: {
                city: true,
                games: true
            },
        });
        return res.json(profiles);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.getProfiles = getProfiles;
const getOneProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const profile = await Profile_1.Profile.findOne({
            where: {
                id: parseInt(id)
            },
            relations: {
                city: true,
                games: true
            },
        });
        if (!profile)
            return res.status(404).json({ message: "Profile not found" });
        return res.json(profile);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.getOneProfile = getOneProfile;
const updateProfile = async (req, res) => {
    const { id } = req.params;
    const { name, surname, age, bornDate, city_id, games, document, nick, gender } = req.body;
    try {
        const foundProfile = await Profile_1.Profile.findOneBy({ id: parseInt(id) });
        if (!foundProfile)
            return res.status(404).json({ message: "Profile not found" });
        const profile = new Profile_1.Profile();
        profile.id = parseInt(id);
        profile.name = name;
        profile.surname = surname;
        profile.age = age;
        profile.bornDate = bornDate;
        profile.city = city_id;
        profile.document = document;
        profile.nick = nick;
        profile.gender = gender;
        profile.games = games;
        await Profile_1.Profile.save(profile);
        return res.status(200).json({ message: "Profile has been updated" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.updateProfile = updateProfile;
const deleteProfile = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Profile_1.Profile.delete({ id: parseInt(id) });
        if (result.affected === 0)
            return res.status(404).json({ message: "Profiles not found" });
        return res.status(200).json({ message: "Profiles has been deleted" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.deleteProfile = deleteProfile;
