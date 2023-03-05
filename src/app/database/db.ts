import { DataSource } from "typeorm";
import { GameGenre } from "../entities/GameGenre";
import { Platform } from "../entities/Platform";
import { TypeUser } from "../entities/TypeUser";
import { State } from "../entities/State";
import { Games } from "../entities/Games";
import { City } from "../entities/City";
import { Profile } from "../entities/Profile";
import { User } from "../entities/User";
import 'dotenv/config';


export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.HOST || "localhost",
    port: Number(String(process.env.PORT)) || 5432,
    username: process.env.USERNAME || "postgres",
    password: process.env.PASSWORD || "root",
    database: process.env.DATABASE || "rng",
    synchronize: true,
    logging: true,
    entities: [Platform, GameGenre, TypeUser, State, Games, City, Profile, User],
});