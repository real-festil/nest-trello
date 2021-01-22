import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnEntity } from 'src/columns/columns.entity';
import { ColumnsModule } from 'src/columns/columns.module';
import { CardsController } from './cards.controller';
import { CardEntity } from './cards.entity';
import { CardsService } from './cards.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CardEntity, ColumnEntity]),
    ColumnsModule,
  ],
  exports: [CardsService],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
