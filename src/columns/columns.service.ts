import { Injectable } from '@nestjs/common';
import { ColumnEntity } from './columns.entity';
import { User } from '../users/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(ColumnEntity)
    private columnsRepository: Repository<ColumnEntity>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async addColumn(userId: string, name: string) {
    const user = await this.usersRepository.findOne(userId);

    if (user === undefined) {
      return false;
    }

    this.columnsRepository.insert({ name, user });
    return true;
  }

  getColumns(userId: string) {
    return this.columnsRepository.find({ where: { user: { id: userId } } });
  }

  getSingleColumn(columnId: string) {
    return this.columnsRepository.findOne(columnId);
  }

  updateColumn(columnId: string, name: string) {
    if (name) {
      this.columnsRepository.update({ id: +columnId }, { name });
    }
  }

  deleteColumn(columnId: string) {
    this.columnsRepository.delete({ id: +columnId });
  }
}
