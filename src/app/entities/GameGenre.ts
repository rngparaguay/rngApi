import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Games } from "./Games";

@Entity()
export class GameGenre
 extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    /* @OneToMany(() => Games, (game) => game.gameGenre)
    games: Games[] */

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
