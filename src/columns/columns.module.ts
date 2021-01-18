import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnsController } from './columns.controller';
import { ColumnsService } from './columns.service';
import { ColumnEntity } from './columns.entity';
import { User } from 'src/users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ColumnEntity, User])],
  controllers: [ColumnsController],
  providers: [ColumnsService],
})
export class ColumnsModule {}
