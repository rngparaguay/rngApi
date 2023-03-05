import { Request, Response } from "express";
import { Profile } from "../entities/Profile";
import { v4 as uuidv4 } from 'uuid';

export const createProfile = async (
  req: Request<unknown, unknown>,
  res: Response
) => {
  try {
    const { name, surname, age, bornDate, city_id, games, document, nick, gender } = req.body;

    const profile = new Profile();
    profile.name = name;
    profile.surname = surname;
    profile.age = age;
    profile.bornDate = bornDate;
    profile.city = city_id;
    profile.games = games;
    profile.document = document;
    profile.nick = nick,
      profile.gender = gender
    profile.nickNumber = uuidv4();
    await Profile.save(profile);
    return res.json(profile);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getProfiles = async (req: Request, res: Response) => {
  try {
    const profiles = await Profile.find({
      relations: {
        city: true,
        games: true
      },
    });
    return res.json(profiles);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getOneProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const profile = await Profile.findOne({
      where: {
        id: parseInt(id)
      },
      relations: {
        city: true,
        games: true
      },
    });

    if (!profile) return res.status(404).json({ message: "Profile not found" });

    return res.json(profile);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, surname, age, bornDate, city_id, games, document, nick, gender } = req.body;

  try {

    const foundProfile = await Profile.findOneBy({ id: parseInt(id) });

    if (!foundProfile) return res.status(404).json({ message: "Profile not found" });

    const profile = new Profile();
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
    await Profile.save(profile);

    return res.status(200).json({ message: "Profile has been updated" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const deleteProfile = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await Profile.delete({ id: parseInt(id) });

    if (result.affected === 0)
      return res.status(404).json({ message: "Profiles not found" });

    return res.status(200).json({ message: "Profiles has been deleted" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
