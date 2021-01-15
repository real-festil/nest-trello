import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AddCommentDto, UpdateCommentDto } from './comments.dto';
import { CommentsService } from './comments.service';
import { CommentOwnerGuard } from '../guards/comment-owner.guard';

@Controller('users/:userId/columns/:columnId/cards/:cardId/comments')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @ApiTags('Comments')
  @ApiOperation({ summary: 'Add comment' })
  @Post()
  async addComment(
    @Param('cardId') cardId: string,
    @Body() addCommentDto: AddCommentDto,
  ) {
    const res = await this.commentService.addComment(
      cardId,
      addCommentDto.text,
    );
    if (!res) {
      throw new NotFoundException();
    }
    return 'Successfully added';
  }

  @ApiTags('Comments')
  @ApiOperation({ summary: 'Delete comment' })
  @UseGuards(new CommentOwnerGuard())
  @Delete(':commentId')
  async deleteComment(@Param('commentId') commentId: string) {
    await this.commentService.deleteComment(commentId);
    return 'Successfully deleted';
  }

  @ApiTags('Comments')
  @ApiOperation({ summary: 'Get all comments' })
  @Get()
  async getColumns(@Param('cardId') cardId: string) {
    const res = await this.commentService.getComments(cardId);
    return res;
  }

  @ApiTags('Comments')
  @ApiOperation({ summary: 'Get single comment' })
  @UseGuards(new CommentOwnerGuard())
  @Get(':commentId')
  async getSingleComment(
    @Param('commentId')
    commentId: string,
  ) {
    const res = await this.commentService.getSingleComment(commentId);
    return res;
  }

  @ApiTags('Comments')
  @ApiOperation({ summary: 'Update comment' })
  @UseGuards(new CommentOwnerGuard())
  @Patch(':commentId')
  async updateCard(
    @Param('commentId') commentId: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    await this.commentService.updateComment(commentId, updateCommentDto.text);
    return 'Successfully updated';
  }
}
