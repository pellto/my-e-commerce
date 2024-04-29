import { registerAs } from '@nestjs/config';

export default registerAs('user_system', () => ({
  host: process.env.USER_SYSTEM_HOST || 'localhost',
  port: process.env.USER_SYSTEM_PORT ? Number(process.env.USER_SYSTEM_PORT) : 3001,
}));
