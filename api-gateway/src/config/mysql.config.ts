import { registerAs } from '@nestjs/config';

export default registerAs('mysql', () => ({
  host: process.env.MYSQL_HOST || 'localhost',
  port: process.env.MYSQL_PORT ? Number(process.env.MYSQL_PORT) : 3306,
  username: process.env.MYSQL_USERNAME || 'root',
  password: process.env.MYSQL_PASSWORD || 'mysqlMyRootPassword',
  database: process.env.MYSQL_DATABASE || 'my_e_commerce_dev',
}));
