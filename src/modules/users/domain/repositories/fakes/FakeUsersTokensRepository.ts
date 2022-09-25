import { v4 as uuidv4 } from 'uuid';
import { IUserTokenRepository } from '@modules/users/domain/repositories/IUserTokenRepository';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

class FakeUsersTokensRepository implements IUserTokenRepository {
  private tokens: UserToken[] = [];

  public async findByToken(token: string): Promise<UserToken | undefined> {
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
}

export default FakeUsersTokensRepository;
