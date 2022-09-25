import { IUser } from '../domain/model/IUser';
import FakeUsersTokensRepository from '../domain/repositories/fakes/FakeUsersTokensRepository';
import authConfig from '@config/auth';
import { sign, Secret } from 'jsonwebtoken';

interface IToken {
  token: string;
}
async function Token(user: IUser): Promise<IToken | undefined> {
  const fakeUsersTokensRepository = new FakeUsersTokensRepository();
  if (process.env.ENV_TEST === 'true') {
    const fakeToken = await fakeUsersTokensRepository.generate(user.id);
    const token = fakeToken.token;
    return token;
  }
  if (process.env.ENV_TEST === 'false') {
    const token = sign({}, authConfig.jwt.secret as Secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });
    return token;
  }
}

export default Token;
