import 'reflect-metadata';
import FakeUsersRepository from '@modules/users/domain/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppErrors';
import ShowProfileService from '../ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('Show Profile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfileService = new ShowProfileService(fakeUsersRepository);
  });
  it('should be able show user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'ZeroTwo',
      email: 'sac.dazm@gmail.com',
      password: 'umastring',
    });

    const { id } = user;
    const user_id = id;

    expect((await showProfileService.execute({ user_id })).id).toEqual(user.id);
  });

  it('should not be able to show user profile if not found a user', async () => {
    await fakeUsersRepository.create({
      name: 'ZeroTwo',
      email: 'sac.dazm@gmail.com',
      password: 'umastring',
    });

    const user_id = 'n0tf0un5-1d3x1st5-02103230';

    expect(showProfileService.execute({ user_id })).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
