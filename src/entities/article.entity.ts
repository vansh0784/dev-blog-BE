import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

export enum ARTICLE_STATUS {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
}

@Entity()
export class Article extends BaseEntity {
  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  shortDescription: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ nullable: true })
  coverImage: string;

  @Column({
    type: 'enum',
    enum: ARTICLE_STATUS,
    default: ARTICLE_STATUS.DRAFT,
  })
  status: ARTICLE_STATUS;

  @Column({ default: 0 })
  viewsCount: number;

  @Column({ default: 0 })
  likesCount: number;

  @Column({ default: 0 })
  commentsCount: number;

  @Column({ nullable: true })
  readingTime: string;

  @Column({ type: 'timestamp', nullable: true })
  publishedAt: Date;

  @Column()
  authorId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'authorId' })
  author: User;
}
