import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const config: TypeOrmModuleOptions = {
  type: 'mysql',
  port: 3306,
  username: 'root',
  password: 'root',
  host: 'localhost',
  database: 'puregram_db',
  synchronize: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
};
