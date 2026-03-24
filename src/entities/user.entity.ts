import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

export enum ROLE {
  user = 'USER',
  admin = 'ADMIN',
}

@Entity()
export class User extends BaseEntity {
  @Column()
  userName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ enum: ROLE, default: ROLE.user })
  role: ROLE;

  @Column({ default: false })
  isActive: boolean;

  @Column()
  lastLoginAt: Date;
}
