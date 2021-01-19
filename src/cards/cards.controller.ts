import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AddCardDto, UpdateCardDto } from './cards.dto';
import { CardsService } from './cards.service';
import { CardOwnerGuard } from '../guards/card-owner.guard';
import { ColumnNotExistsGuard } from 'src/guards/column-not-exist.guard';

@Controller('users/:userId/columns/:columnId/cards')
@UseGuards(ColumnNotExistsGuard)
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @ApiTags('Cards')
  @ApiOperation({ summary: 'Add cards' })
  @Post()
  async addCard(
    @Param('columnId') columnId: string,
    @Body() addCardDto: AddCardDto,
  ) {
    const res = await this.cardsService.addCard(
      columnId,
      addCardDto.name,
      addCardDto.description,
    );
    return res;
  }

  @ApiTags('Cards')
  @ApiOperation({ summary: 'Delete card' })
  @UseGuards(new CardOwnerGuard())
  @Delete(':cardId')
  async deleteCard(@Param('cardId') cardId: string) {
    await this.cardsService.deleteCard(cardId);
    return 'Successfully deleted';
  }

  @ApiTags('Cards')
  @ApiOperation({ summary: 'Get all cards' })
  @Get()
  async getColumns(@Param('columnId') columnId: string) {
    const res = await this.cardsService.getCards(columnId);
    return res;
  }

  @ApiTags('Cards')
  @ApiOperation({ summary: 'Get single card' })
  @UseGuards(new CardOwnerGuard())
  @Get(':cardId')
  async getSingleCard(
    @Param('cardId')
    cardId: string,
  ) {
    const res = await this.cardsService.getSingleCard(cardId);
    return res;
  }

  @ApiTags('Cards')
  @ApiOperation({ summary: 'Update card' })
  @UseGuards(new CardOwnerGuard())
  @Patch(':cardId')
  async updateCard(
    @Param('cardId') cardId: string,
    @Body() updateCardDto: UpdateCardDto,
  ) {
    await this.cardsService.updateCard(
      cardId,
      updateCardDto.name,
      updateCardDto.description,
    );
    return 'Successfully updated';
  }
}
