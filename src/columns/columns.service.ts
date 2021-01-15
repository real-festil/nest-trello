import { Injectable } from '@nestjs/common';
import { ColumnEntity } from './columns.entity';
import { User } from '../users/users.entity';

@Injectable()
export class ColumnsService {
  async addColumn(userId: string, name: string) {
    const user = await User.findOne(userId);

    if (user === undefined) {
      return false;
    }

    ColumnEntity.insert({ name, user });
    return true;
  }

  getColumns(userId: string) {
    return ColumnEntity.find({ where: { user: { id: userId } } });
  }

  getSingleColumn(columnId: string) {
    return ColumnEntity.findOne(columnId);
  }

  updateColumn(columnId: string, name: string) {
    if (name) {
      ColumnEntity.update({ id: +columnId }, { name });
    }
  }

  deleteColumn(columnId: string) {
    ColumnEntity.delete({ id: +columnId });
  }
}
