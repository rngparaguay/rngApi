import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class TypeUser
 extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => User, (user) => user.typeUser)
    users: User[]

    @UpdateDateColumn()
    updatedAt: Date;
}
