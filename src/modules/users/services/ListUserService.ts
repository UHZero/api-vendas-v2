import { inject, injectable } from 'tsyringe';
import { IUser } from '../domain/model/IUser';
import { IUsersRepository } from '../domain/model/IUsersRepository';

@injectable()
class ListUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  public async execute(): Promise<IUser[]> {
    const users = await this.usersRepository.findAll();

    return users;
  }
}

export default ListUserService;
