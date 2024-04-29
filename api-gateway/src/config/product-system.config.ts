import { registerAs } from '@nestjs/config';

export default registerAs('product_system', () => ({
  host: process.env.PRODUCT_SYSTEM_HOST || 'localhost',
  port: process.env.PRODUCT_SYSTEM_PORT ? Number(process.env.PRODUCT_SYSTEM_PORT) : 3003,
}));
