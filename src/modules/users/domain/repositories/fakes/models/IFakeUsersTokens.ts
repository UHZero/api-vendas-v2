import { IUserToken } from '@modules/users/domain/model/IUserToken';

export interface IFakeUserTokenRepository {
  findByToken(token: string): Promise<IUserToken | undefined>;
  generate(user_id: string): Promise<IUserToken>;
}
