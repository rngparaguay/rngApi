import { Request, Response } from "express";
import { City } from "../entities/City";
import { ICityReq } from "../interfaces/ICity";

export const createCity = async (
  req: Request<unknown, unknown>,
  res: Response
) => {
  try {
    const { name, state_id } = req.body;
    const city = new City();
    city.name = name;
    city.state = state_id;
    await City.save(city);
    return res.json(city);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getCity = async (req: Request, res: Response) => {
  try {
    const cities = await City.find({
      relations: {
        state: true,
      },
    });
    return res.json(cities);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getOneCity = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const city = await City.findOneBy({ id: parseInt(id) });

    if (!city) return res.status(404).json({ message: "City not found" });

    return res.json(city);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const updateCity = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const city = await City.findOneBy({ id: parseInt(id) });

    if (!city) return res.status(404).json({ message: "City not found" });

    await City.update({ id: parseInt(id) }, req.body);

    return res.status(200).json({ message: "City has been updated" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const deleteCity = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await City.delete({ id: parseInt(id) });

    if (result.affected === 0)
      return res.status(404).json({ message: "City not found" });

    return res.status(200).json({ message: "City has been deleted" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
