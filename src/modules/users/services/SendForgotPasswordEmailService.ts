import AppError from '@shared/errors/AppErrors';
import Ethereal from '@config/mail/Ethereal';
import SESMail from '@config/mail/SESMail';
import mailConfig from '@config/mail/mail';
import path from 'path';
import { inject, injectable } from 'tsyringe';
import { IUserTokenRepository } from '../domain/repositories/IUserTokenRepository';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { ISendForgotPasswordEmail } from '../domain/model/ISendForgotPasswordEmail';

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersTokensRepository')
    private userTokensRepository: IUserTokenRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  public async execute({ email }: ISendForgotPasswordEmail): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists!');
    }

    const { token } = await this.userTokensRepository.generate(user.id);

    const forgotMailTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    if (mailConfig.driver === 'ses') {
      await SESMail.sendMail({
        to: {
          name: user.name,
          email: user.email,
        },
        subject: '[API Vendas] - Password Recovery Key',
        templateData: {
          file: forgotMailTemplate,
          variables: {
            name: user.name,
            link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
          },
        },
      });
      return;
    }

    await Ethereal.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[API Vendas] - Password Recovery Key',
      templateData: {
        file: forgotMailTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
