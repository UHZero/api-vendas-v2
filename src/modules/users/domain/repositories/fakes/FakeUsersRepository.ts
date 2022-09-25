import { v4 as uuidv4 } from 'uuid';
import { ICreateUser } from '@modules/users/domain/model/ICreateUser';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async create({ name, email, password }: ICreateUser): Promise<User> {
    const user = new User();

    const today = new Date();

    user.id = uuidv4();
    user.name = name;
    user.email = email;
    user.password = password;
    user.avatar = '';
    user.created_at = today;
    user.updated_at = today;

    this.users.push(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    Object.assign(this.users, user);
    return user;
  }

  public async findAll(): Promise<User[]> {
    return this.users;
  }

  public async findByName(name: string): Promise<User | undefined> {
    const user = this.users.find(user => user.name === name);
    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(user => user.id === id);
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(user => user.email === email);
    return user;
  }
}

export default FakeUsersRepository;
