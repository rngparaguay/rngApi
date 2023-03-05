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
import { City } from "./City";
import { Games } from "./Games";

@Entity()
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickNumber: string;
  
  @Column()
  nick: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  age: number;

  @Column()
  gender: string;

  @Column()
  bornDate: Date;

  @ManyToOne(() => City, (city) => city.id)
  city: City;

  @ManyToMany(() => Games, { cascade: true })
  @JoinTable()
  games: Games[];

  @Column()
  document: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
