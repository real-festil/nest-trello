import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CardEntity } from '../cards/cards.entity';

@Entity('comments')
export class CommentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 300 })
  text: string;

  @ManyToOne(() => CardEntity, (card) => card.comments)
  card: CardEntity;
}
