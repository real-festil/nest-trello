import { Body, Controller, Delete, Get, Post, Patch } from '@nestjs/common';
import { Param, UseGuards } from '@nestjs/common';
import { UserNotExistsGuard } from '../users/users.guard';
import { ColumnsService } from './columns.service';
import { ColumnOwnerGuard } from './columns.guard';
import { AddColumnDto, UpdateColumnDto } from './columns.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/decorators/current-user.decorator';

@UseGuards(UserNotExistsGuard)
@Controller('/columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @ApiTags('Columns')
  @ApiOperation({ summary: 'Add column' })
  @Post()
  async addColumn(
    @CurrentUser('id') userId,
    @Body() addColumnDto: AddColumnDto,
  ) {
    return await this.columnsService.addColumn(userId, addColumnDto.name);
  }

  @ApiTags('Columns')
  @ApiOperation({ summary: 'Delete column' })
  @UseGuards(ColumnOwnerGuard, UserNotExistsGuard)
  @Delete(':columnId')
  async deleteColumn(@Param('columnId') columnId: string) {
    return await this.columnsService.deleteColumn(columnId);
  }

  @ApiTags('Columns')
  @ApiOperation({ summary: 'Get all columns' })
  @Get()
  async getColumns(@Param('userId') userId: string) {
    return await this.columnsService.getColumns(userId);
  }

  @ApiTags('Columns')
  @ApiOperation({ summary: 'Get single column' })
  @UseGuards(ColumnOwnerGuard)
  @Get(':columnId')
  async getSingleColumn(
    @Param('columnId')
    columnId: string,
  ) {
    return await this.columnsService.getSingleColumn(columnId);
  }

  @ApiTags('Columns')
  @ApiOperation({ summary: 'Update column' })
  @UseGuards(ColumnOwnerGuard)
  @Patch(':columnId')
  async updateColumn(
    @Param('columnId')
    columnId: string,
    @Body() updateColumnDto: UpdateColumnDto,
  ) {
    return await this.columnsService.updateColumn(
      columnId,
      updateColumnDto.name,
    );
  }
}
