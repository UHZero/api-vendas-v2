import AppError from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IShowUser } from '../domain/model/IShowUser';
import { IUser } from '../domain/model/IUser';
import { IUsersRepository } from '../domain/model/IUsersRepository';

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  public async execute({ user_id }: IShowUser): Promise<IUser> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found!');
    }

    return user;
  }
}

export default ShowProfileService;
