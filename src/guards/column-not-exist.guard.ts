import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ColumnEntity } from 'src/columns/columns.entity';
import { Repository } from 'typeorm';

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
