import { registerAs } from '@nestjs/config';

export default registerAs('order_system', () => ({
  host: process.env.ORDER_SYSTEM_HOST || 'localhost',
  port: process.env.ORDER_SYSTEM_PORT ? Number(process.env.ORDER_SYSTEM_PORT) : 3004,
}));
