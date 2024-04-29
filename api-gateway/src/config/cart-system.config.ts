import { registerAs } from '@nestjs/config';

export default registerAs('cart_system', () => ({
  host: process.env.CART_SYSTEM_HOST || 'localhost',
  port: process.env.CART_SYSTEM_PORT ? Number(process.env.CART_SYSTEM_PORT) : 3004,
}));
