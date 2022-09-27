import { v4 as uuidv4 } from 'uuid';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import { IFakeUserTokenRepository } from './models/IFakeUsersTokens';
import { IUserToken } from '../../model/IUserToken';

class FakeUsersTokensRepository implements IFakeUserTokenRepository {
  private tokens: UserToken[] = [];

  public async findByToken(token: string): Promise<IUserToken | undefined> {
    const findToken = this.tokens.find(tk => tk.token === token);
    return findToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const token = new UserToken();
    const generateToken = uuidv4();

    token.id = uuidv4();
    token.user_id = user_id;
    token.token = generateToken;
    token.created_at = new Date();
    token.updated_at = new Date();

    this.tokens.push(token);
    return token;
  }

  public async save(userToken: IUserToken): Promise<IUserToken> {
    const findTokenIndex = this.tokens.findIndex(
      tokenIndex => tokenIndex.token === userToken.token,
    );

    this.tokens[findTokenIndex] = userToken;

    return userToken;
  }
}

export default FakeUsersTokensRepository;
