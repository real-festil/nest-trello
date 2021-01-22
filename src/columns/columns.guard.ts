import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColumnEntity } from '../columns/columns.entity';
import * as isUUID from 'is-uuid';

@Injectable()
export class ColumnOwnerGuard implements CanActivate {
  constructor(
    @InjectRepository(ColumnEntity)
    private columnsRepository: Repository<ColumnEntity>,
  ) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    if (req.params.columnId && isUUID.v4(req.params.columnId)) {
      const column = await this.columnsRepository.findOne(req.params.columnId, {
        relations: ['user'],
      });
      if (!column) {
        throw new NotFoundException('Column not found');
      }
      if (column.user.id === req.user.id) {
        return true;
      } else {
        throw new ForbiddenException('User does not have permission');
      }
    } else {
      throw new ForbiddenException('Invalid column id type');
    }
  }
}

@Injectable()
export class ColumnNotExistsGuard implements CanActivate {
  constructor(
    @InjectRepository(ColumnEntity)
    private columnsRepository: Repository<ColumnEntity>,
  ) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const user = await this.columnsRepository.findOne({
      id: req.params.columnId,
    });

    if (!user) {
      throw new ForbiddenException('Column with this id not exists');
    }
    return true;
  }
}
