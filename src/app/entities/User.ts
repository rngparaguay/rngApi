import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Profile } from "./Profile";
import { TypeUser } from "./TypeUser";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToOne(() => Profile)
  @JoinColumn({ name: "profile_id" })
  profile!: Profile;

  @ManyToOne(() => TypeUser, (typeUser) => typeUser.id)
  typeUser: TypeUser

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
