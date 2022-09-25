interface ITokenJwt {
  jwt: {
    secret: string;
    expiresIn: string;
  };
}
export default {
  jwt: {
    secret: 'MinhaSecret', //process.env.APP_SECRET,
    expiresIn: '1d',
  },
} as ITokenJwt;
