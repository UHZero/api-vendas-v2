import FakeUsersRepository from '@modules/users/domain/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppErrors';
import 'reflect-metadata';
import UpdateProfileService from '../UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let updateProfileService: UpdateProfileService;
let fakeHashProvider: FakeHashProvider;

describe('Update Profile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able to update user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'teste.test@test.com',
      password: 'umasenha123',
    });

    const user_id = user.id;

    const updateProfile = {
      user_id,
      name: 'newName',
      email: 'email.profile@test.com',
      password: 'senha321',
      old_password: 'umasenha123',
    };

    expect((await updateProfileService.execute(updateProfile)).email).toEqual(
      updateProfile.email,
    );
  });

  it('should not be able to update user profile if user not found', async () => {
    await fakeUsersRepository.create({
      name: 'Test',
      email: 'teste.test@test.com',
      password: 'umasenha123',
    });

    const user_id = 'user.id';

    const updateProfile = {
      user_id,
      name: 'newName',
      email: 'email.profile@test.com',
      password: 'senha321',
      old_password: 'umasenha123',
    };

    expect(updateProfileService.execute(updateProfile)).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should not be able to update user profile if email is already in use', async () => {
    await fakeUsersRepository.create({
      name: 'Test',
      email: 'email.already.in.use@email.com',
      password: 'umasenha123',
    });

    const user = await fakeUsersRepository.create({
      name: 'TestRejectUserWithSameEmail',
      email: 'email.test@email.com',
      password: 'senha321',
    });

    const user_id = user.id;

    expect(
      updateProfileService.execute({
        user_id,
        name: 'TestRejectUserWithSameEmail',
        email: 'email.already.in.use@email.com',
        password: 'senha321',
        old_password: 'senha321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to update user profile if doesn't match old password", async () => {
    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'teste.test@test.com',
      password: 'umasenha123',
    });

    const user_id = user.id;

    expect(
      updateProfileService.execute({
        user_id,
        name: 'TestRejectUserWithSameEmail',
        email: 'email.already.in.use@email.com',
        password: 'senha321',
        old_password: '',
      }),
    ).rejects.toBeInstanceOf(AppError);

    expect(
      updateProfileService.execute({
        user_id,
        name: 'TestRejectUserWithSameEmail',
        email: 'email.already.in.use@email.com',
        password: 'senha321',
        old_password: 'senha321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
