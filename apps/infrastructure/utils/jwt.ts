import * as jsonwebtoken from 'jsonwebtoken';

export const parse = (authorization: string) => {
  const [key, jwt] = authorization?.split(' ') || ['', ''];
  return key && jwt ? { key, jwt } : { key: '', jwt: '' };
};

export const decode = <T>(jwt: string): T => {
  return jsonwebtoken.decode(jwt) as T;
};
