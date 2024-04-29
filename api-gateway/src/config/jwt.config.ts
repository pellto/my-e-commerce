import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET || 'jwt_secret',
  expiresIn: process.env.JWT_EXPIRES_IN || '1day',
}));
