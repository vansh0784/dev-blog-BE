import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Article } from './article.entity';

export enum STATUS {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

@Entity()
export class Comment extends BaseEntity {
  @ManyToOne(() => Article)
  @JoinColumn({ name: 'articleId' })
  article: Article;

  @Column()
  name: string;

  @Column({ nullable: true })
  email: string;

  @Column({ type: 'text' })
  content: string;

  @Column({
    type: 'enum',
    enum: STATUS,
    default: STATUS.PENDING,
  })
  status: STATUS;
}
