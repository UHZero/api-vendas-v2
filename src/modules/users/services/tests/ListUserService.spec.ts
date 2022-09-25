import 'reflect-metadata';
import FakeUsersRepository from '@modules/users/domain/repositories/fakes/FakeUsersRepository';
import CreateUserService from '../CreateUserService';
import ListUserService from '../ListUserService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

let fakeRepository: FakeUsersRepository;
let createUser: CreateUserService;
let listUser: ListUserService;
let hashProvider: FakeHashProvider;

describe('List User', () => {
  beforeEach(() => {
    fakeRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeRepository, hashProvider);
    listUser = new ListUserService(fakeRepository);
  });
  it('should be able to list users', async () => {
    await createUser.execute({
      name: 'TesteName',
      email: 'teste.teste@email.com',
      password: 'senha123',
    });

    expect(listUser.execute()).toBeTruthy();
  });
});
