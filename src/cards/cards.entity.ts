import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ColumnEntity } from '../columns/columns.entity';
import { CommentEntity } from '../comments/comments.entity';

@Entity('cards')
export class CardEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  description?: string;

  @ManyToOne(() => ColumnEntity, (column) => column.cards)
  column: ColumnEntity;

  @OneToMany(() => CommentEntity, (comments) => comments.card)
  comments: CommentEntity[];
}
