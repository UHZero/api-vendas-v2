import 'reflect-metadata';
import FakeUsersRepository from '@modules/users/domain/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppErrors';
import CreateUserService from '../CreateUserService';

let fakeRepository: FakeUsersRepository;
let createUser: CreateUserService;
let hashProvider: FakeHashProvider;

describe('Create User', () => {
  beforeEach(() => {
    fakeRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeRepository, hashProvider);
  });
  it('should be able to create a user', async () => {
    const user = await createUser.execute({
      name: 'TesteName',
      email: 'teste.teste@email.com',
      password: 'senha123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create two users with the same email', async () => {
    await createUser.execute({
      name: 'TesteName',
      email: 'teste.teste@email.com',
      password: 'senha123',
    });

    expect(
      createUser.execute({
        name: 'TesteName',
        email: 'teste.teste@email.com',
        password: 'senha123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
