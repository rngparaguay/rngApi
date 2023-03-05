import { Request, Response } from "express";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import authConfig from "../config/auth";
import { profile } from "console";

export const createUser = async (
    req: Request<unknown, unknown>,
    res: Response
) => {
    try {

        const { email, password, profile_id, type_user_id } = req.body;


        const hashPassword = await bcrypt.hash(password, 10)
        const user = new User();
        user.email = email;
        user.password = hashPassword;
        user.profile = profile_id;
        user.typeUser = type_user_id;

        const userExists = await User.findOneBy({ email });

        if (!userExists) {
            await User.save(user);
            return res.json(user);
        } else {
            return res.status(500).json({ message: 'User Already Exists' });
        }




    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find({
            relations: {
                profile: true,
                typeUser: true
            }
        });
        return res.json(users)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export const getOneUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const user = await User.findOne({
            where: {
                id: parseInt(id)
            }, relations: {
                profile: true
            }
        });

        if (!user) return res.status(404).json({ message: 'User not found' });

        return res.json(user);

    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const user = await User.findOneBy({ id: parseInt(id) });

        if (!user) return res.status(404).json({ message: "User not found" });

        await User.update({ id: parseInt(id) }, req.body);

        return res.status(200).json({ message: "User has been updated" });

    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const result = await User.delete({ id: parseInt(id) });

        if (result.affected === 0)
            return res.status(404).json({ message: "User not found" });

        return res.status(200).json({ message: "User has been deleted" });

    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body

    const user = await User.findOneBy({ email })

    if (!user) {
        return res.status(401).json({ error: 'User not found' });
    }

    const verifyPass = await bcrypt.compare(password, user.password)

    if (!verifyPass) {
        return res.status(401).json({ error: 'Invalid Password' });
    }

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: '8h',
    })

    const { password: _, ...userLogin } = user

    return res.json({
        user: userLogin,
        token: token,
    })
}