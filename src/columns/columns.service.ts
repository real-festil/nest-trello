import { Inject, Injectable, Scope } from '@nestjs/common';
import { ColumnEntity } from './columns.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/users/users.service';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class ColumnsService {
  constructor(
    @InjectRepository(ColumnEntity)
    private columnsRepository: Repository<ColumnEntity>,
    private userService: UserService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  async addColumn(userId: string, name: string) {
    const user = await this.userService.getSingleUser(userId);
    return await this.columnsRepository.save({ name, user });
  }

  async getColumns(userId: string) {
    return await this.columnsRepository.find({
      where: { user: { id: userId } },
    });
  }

  async getSingleColumn(columnId: string) {
    return await this.columnsRepository.findOne(columnId);
  }

  async updateColumn(columnId: string, name: string) {
    return await this.columnsRepository.save({ id: columnId, name });
  }

  async deleteColumn(columnId: string) {
    return await this.columnsRepository.delete({ id: columnId });
  }
}
