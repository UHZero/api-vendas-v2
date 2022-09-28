import 'reflect-metadata';
import FakeUsersRepository from '@modules/users/domain/repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from '../UpdateUserAvatarService';
import AppError from '@shared/errors/AppErrors';

let fakeUsersRepository: FakeUsersRepository;
let updateUserAvatarService: UpdateUserAvatarService;

describe('Update Avatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    updateUserAvatarService = new UpdateUserAvatarService(fakeUsersRepository);
  });
  it('should not be able to update user avatar', async () => {
    await fakeUsersRepository.create({
      name: 'Test',
      email: 'teste.test@test.com',
      password: 'umasenha123',
    });

    const user_id = 'user.id';

    expect(
      updateUserAvatarService.execute({
        user_id,
        avatarFileName: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  // it('should not be able to update user avatar', async () => {
  //   const user = await fakeUsersRepository.create({
  //     name: 'Test',
  //     email: 'teste.test@test.com',
  //     password: 'umasenha123',
  //   });

  //   const user_id = user.id;

  //   expect(
  //     updateUserAvatarService.execute({
  //       user_id,
  //       avatarFileName: '',
  //     }),
  //   ).rejects.toBeInstanceOf(AppError);
  // });
});
