import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnEntity } from 'src/columns/columns.entity';
import { CardsController } from './cards.controller';
import { CardEntity } from './cards.entity';
import { CardsService } from './cards.service';

@Module({
  imports: [TypeOrmModule.forFeature([CardEntity, ColumnEntity])],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
