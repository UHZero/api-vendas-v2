import { ICreateUser } from '../model/ICreateUser';
import { IUser } from '../model/IUser';

export interface IUsersRepository {
  findAll(): Promise<IUser[]>;
  findByName(name: string): Promise<IUser | undefined>;
  findById(id: string): Promise<IUser | undefined>;
  findByEmail(email: string): Promise<IUser | undefined>;
  create(data: ICreateUser): Promise<IUser>;
  save(user: IUser): Promise<IUser>;
}
