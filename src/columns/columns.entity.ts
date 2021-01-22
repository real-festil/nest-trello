import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/users.entity';
import { CardEntity } from '../cards/cards.entity';

@Entity('columns')
export class ColumnEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @ManyToOne(() => User, (user) => user.columns)
  user: User;

  @OneToMany(() => CardEntity, (cards) => cards.column)
  cards: CardEntity[];
}
