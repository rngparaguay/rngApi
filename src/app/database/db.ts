import { DataSource } from "typeorm";
import { GameGenre } from "../entities/GameGenre";
import { Platform } from "../entities/Platform";
import { TypeUser } from "../entities/TypeUser";
import { State } from "../entities/State";
import { Games } from "../entities/Games";
import { City } from "../entities/City";
import { Profile } from "../entities/Profile";
import { User } from "../entities/User";
import * as dotenv from "dotenv";

dotenv.config({ path: process.cwd() + '/src/.env'})

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DATABASE_URL,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    synchronize: true,
    logging: true,
    entities: [Platform, GameGenre, TypeUser, State, Games, City, Profile, User],
});