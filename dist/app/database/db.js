"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const GameGenre_1 = require("../entities/GameGenre");
const Platform_1 = require("../entities/Platform");
const TypeUser_1 = require("../entities/TypeUser");
const State_1 = require("../entities/State");
const Games_1 = require("../entities/Games");
const City_1 = require("../entities/City");
const Profile_1 = require("../entities/Profile");
const User_1 = require("../entities/User");
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: process.cwd() + '/src/.env' });
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.HOSTDB,
    port: Number(process.env.PORTDB),
    username: process.env.USERNAMEDB,
    password: process.env.PASSWORDDB,
    database: process.env.DATABASE,
    synchronize: true,
    logging: true,
    entities: [Platform_1.Platform, GameGenre_1.GameGenre, TypeUser_1.TypeUser, State_1.State, Games_1.Games, City_1.City, Profile_1.Profile, User_1.User],
});
