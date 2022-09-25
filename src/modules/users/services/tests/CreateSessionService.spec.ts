import FakeUsersRepository from '@modules/users/domain/repositories/fakes/FakeUsersRepository';
import CreateUserService from '../CreateUserService';
import CreateSessionsService from '../CreationSessionsService';

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;
let createSession: CreateSessionsService;

describe('Create Session', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    createUser = new CreateUserService(fakeUsersRepository);
    createSession = new CreateSessionsService(fakeUsersRepository);
  });
  it('should be able to create a user session', async () => {
    await createUser.execute({
      name: 'TesteName',
      email: 'teste.teste@email.com',
      password: 'senha123',
    });

    const authUser = await createSession.execute({
      email: 'teste.teste@email.com',
      password: 'senha123',
    });

    console.log(authUser);

    expect(authUser).toHaveProperty('token');
  });
});
