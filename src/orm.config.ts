import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  port: 5432,
  username: 'postgres',
  password: 'root',
  host: 'localhost',
  database: 'trellodb',
  synchronize: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
};
