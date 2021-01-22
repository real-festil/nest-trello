import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnsController } from './columns.controller';
import { ColumnsService } from './columns.service';
import { ColumnEntity } from './columns.entity';
import { User } from 'src/users/users.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([ColumnEntity, User]), UsersModule],
  exports: [ColumnsService],
  controllers: [ColumnsController],
  providers: [ColumnsService],
})
export class ColumnsModule {}
