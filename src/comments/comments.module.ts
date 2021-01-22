import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { CommentEntity } from './comments.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardEntity } from 'src/cards/cards.entity';
import { CardsModule } from 'src/cards/cards.module';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity, CardEntity]), CardsModule],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
