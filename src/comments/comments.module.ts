import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { CommentEntity } from './comments.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardEntity } from 'src/cards/cards.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity, CardEntity])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
