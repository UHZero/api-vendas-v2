import 'reflect-metadata';
import FakeUsersRepository from '@modules/users/domain/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateSessionsService from '../CreationSessionsService';
import AppError from '@shared/errors/AppErrors';

let fakeUsersRepository: FakeUsersRepository;
let createSession: CreateSessionsService;
let hashProvider: FakeHashProvider;

describe('Create Session', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    createSession = new CreateSessionsService(
      fakeUsersRepository,
      hashProvider,
    );
  });
  it('should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
      name: 'TesteName',
      email: 'teste.teste@email.com',
      password: 'senha123',
    });

    const authUser = await createSession.execute({
      email: 'teste.teste@email.com',
      password: 'senha123',
    });

    // console.log(authUser);

    expect(authUser).toHaveProperty('token');
    expect(authUser.user).toEqual(user);
  });

  it('should not be able to authenticate if incompatible email/password', async () => {
    await fakeUsersRepository.create({
      name: 'TesteName',
      email: 'teste.teste@email.com',
      password: 'senha123',
    });

    expect(
      createSession.execute({
        email: 'teste-teste@email.com',
        password: 'senha123',
      }),
    ).rejects.toBeInstanceOf(AppError);

    expect(
      createSession.execute({
        email: 'teste.teste@email.com',
        password: 'senhaincorreta123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
