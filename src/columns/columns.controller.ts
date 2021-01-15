import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Patch,
  NotFoundException,
} from '@nestjs/common';
import { Param, UseGuards } from '@nestjs/common';
import { UserOwnerGuard } from '../guards/user-owner.guard';
import { ColumnsService } from './columns.service';
import { ColumnOwnerGuard } from '../guards/column-owner.guard';
import { AddColumnDto, UpdateColumnDto } from './columns.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@UseGuards(new UserOwnerGuard())
@Controller('users/:userId/columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @ApiTags('Columns')
  @ApiOperation({ summary: 'Add column' })
  @Post()
  async addColumn(
    @Param('userId') userId: string,
    @Body() addColumnDto: AddColumnDto,
  ) {
    const res = await this.columnsService.addColumn(userId, addColumnDto.name);

    if (!res) {
      throw new NotFoundException();
    }

    return 'Successfully added';
  }

  @ApiTags('Columns')
  @ApiOperation({ summary: 'Delete column' })
  @UseGuards(new ColumnOwnerGuard())
  @Delete(':columnId')
  async deleteColumn(@Param('columnId') columnId: string) {
    await this.columnsService.deleteColumn(columnId);
    return 'Successfully deleted';
  }

  @ApiTags('Columns')
  @ApiOperation({ summary: 'Get all columns' })
  @Get()
  async getColumns(@Param('userId') userId: string) {
    const res = await this.columnsService.getColumns(userId);
    return res;
  }

  @ApiTags('Columns')
  @ApiOperation({ summary: 'Get single column' })
  @UseGuards(new ColumnOwnerGuard())
  @Get(':columnId')
  async getSingleColumn(
    @Param('columnId')
    columnId: string,
  ) {
    const res = await this.columnsService.getSingleColumn(columnId);
    return res;
  }

  @ApiTags('Columns')
  @ApiOperation({ summary: 'Update column' })
  @UseGuards(new ColumnOwnerGuard())
  @Patch(':columnId')
  async updateColumn(
    @Param('columnId') columnId: string,
    @Body() updateColumnDto: UpdateColumnDto,
  ) {
    await this.columnsService.updateColumn(columnId, updateColumnDto.name);
    return 'Successfully updated';
  }
}
