import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ColumnEntity } from '../columns/columns.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  username: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 200 })
  password: string;

  @OneToMany(() => ColumnEntity, (columns) => columns.user)
  columns: ColumnEntity[];
}
