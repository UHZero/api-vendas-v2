import 'reflect-metadata';
import FakeUsersTokensRepository from '@modules/users/domain/repositories/fakes/FakeUsersTokensRepository';
import FakeUsersRepository from '@modules/users/domain/repositories/fakes/FakeUsersRepository';
import ResetPasswordService from '../ResetPasswordService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppErrors';
import { addHours } from 'date-fns';

let fakeUserTokens: FakeUsersTokensRepository;
let fakeUsersRepository: FakeUsersRepository;
let resetPasswordService: ResetPasswordService;
let hashProvider: FakeHashProvider;

describe('Reset Password', () => {
  beforeEach(() => {
    fakeUserTokens = new FakeUsersTokensRepository();
    fakeUsersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokens,
      hashProvider,
    );
  });
  it('should be able to reset user password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Teste',
      email: 'teste@teste.com.br',
      password: 'pass123',
    });

    const userToken = await fakeUserTokens.generate(user.id);
    const { token } = userToken;
    const userObject = {
      token,
      password: 'senha123',
    };
    const tokenNotFound = {
      token: 'token-notf0un5-4rr0z',
      password: 'senha123',
    };

    expect(resetPasswordService.execute(userObject)).toBeTruthy();
    expect(resetPasswordService.execute(tokenNotFound)).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should not be able to reset user password if user not found', async () => {
    const fakeUserToken = await fakeUserTokens.generate(
      'id-n0t-fo444543l3-3x1t',
    );
    const { token } = fakeUserToken;

    const userNotFound = {
      token,
      password: 'pass4321',
    };

    expect(resetPasswordService.execute(userNotFound)).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should not be able to reset user password after token expired', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Teste',
      email: 'teste@teste.com.br',
      password: 'pass123',
    });

    const userToken = await fakeUserTokens.generate(user.id);
    userToken.created_at = addHours(userToken.created_at, -3);
    await fakeUserTokens.save(userToken);
    const findModifiedToken = await fakeUserTokens.findByToken(userToken.token);
    const token = `${findModifiedToken?.token}`;

    await expect(
      resetPasswordService.execute({ token, password: 'any' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
