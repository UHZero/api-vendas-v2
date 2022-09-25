import FakeUsersRepository from '@modules/users/domain/repositories/fakes/FakeUsersRepository';
import CreateUserService from '../CreateUserService';
import ListUserService from '../ListUserService';

let fakeRepository: FakeUsersRepository;
let createUser: CreateUserService;
let listUser: ListUserService;

describe('List User', () => {
  beforeEach(() => {
    fakeRepository = new FakeUsersRepository();
    createUser = new CreateUserService(fakeRepository);
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
