import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { GameGenre } from "./GameGenre";
import { Platform } from "./Platform";
import { Profile } from "./Profile";

@Entity()
export class Games extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => GameGenre, (gameGenre) => gameGenre.id)
  gameGenre: GameGenre

  @ManyToOne(() => Platform, (platform) => platform.id)
  platform: Platform

  @ManyToMany(() => Profile, { cascade: true })
  @JoinTable()
  profile: Profile[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
