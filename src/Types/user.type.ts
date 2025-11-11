import { Types, HydratedDocument } from 'mongoose';

export enum RolesEnum {
  USER = 'user',
  ADMIN = 'admin',
  MANAGER = 'manager',
}

export interface IUser {
  username: string;
  email: string;
  password: string;
  role: RolesEnum;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type HydratedUser = HydratedDocument<IUser>;
