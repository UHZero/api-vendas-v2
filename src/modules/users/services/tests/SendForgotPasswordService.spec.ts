import 'reflect-metadata';
import FakeUsersRepository from '@modules/users/domain/repositories/fakes/FakeUsersRepository';
import FakeUsersTokensRepository from '@modules/users/domain/repositories/fakes/FakeUsersTokensRepository';
import SendForgotPasswordEmailService from '../SendForgotPasswordEmailService';
import AppError from '@shared/errors/AppErrors';

let fakeUsersRepository: FakeUsersRepository;
let fakeUsersTokensRepository: FakeUsersTokensRepository;
let sendForgotPasswordService: SendForgotPasswordEmailService;

describe('Send Forgot Password', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUsersTokensRepository = new FakeUsersTokensRepository();
    sendForgotPasswordService = new SendForgotPasswordEmailService(
      fakeUsersTokensRepository,
      fakeUsersRepository,
    );
  });
  it('should be able to send mail with a recovery key', async () => {
    const user = await fakeUsersRepository.create({
      name: 'ZeroTwo',
      email: 'sac.dazm@gmail.com',
      password: 'umastring',
    });

    const { email } = user;

    expect(sendForgotPasswordService.execute({ email })).toBeTruthy();
  });

  it('should not be able to send mail with user not found/exists!', async () => {
    await fakeUsersRepository.create({
      name: 'ZeroTwo',
      email: 'sac.dazm@gmail.com',
      password: 'umastring',
    });

    const email = 'emailnotexist@mail.com';

    expect(sendForgotPasswordService.execute({ email })).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
