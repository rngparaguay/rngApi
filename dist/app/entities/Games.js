"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Games = void 0;
const typeorm_1 = require("typeorm");
const GameGenre_1 = require("./GameGenre");
const Platform_1 = require("./Platform");
const Profile_1 = require("./Profile");
let Games = class Games extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Games.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Games.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => GameGenre_1.GameGenre, (gameGenre) => gameGenre.id),
    __metadata("design:type", GameGenre_1.GameGenre)
], Games.prototype, "gameGenre", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Platform_1.Platform, (platform) => platform.id),
    __metadata("design:type", Platform_1.Platform)
], Games.prototype, "platform", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Profile_1.Profile, { cascade: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Games.prototype, "profile", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Games.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Games.prototype, "updatedAt", void 0);
Games = __decorate([
    (0, typeorm_1.Entity)()
], Games);
exports.Games = Games;
