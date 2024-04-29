import { registerAs } from '@nestjs/config';

export default registerAs('store_system', () => ({
  host: process.env.STORE_SYSTEM_HOST || 'localhost',
  port: process.env.STORE_SYSTEM_PORT ? Number(process.env.STORE_SYSTEM_PORT) : 3002,
}));
