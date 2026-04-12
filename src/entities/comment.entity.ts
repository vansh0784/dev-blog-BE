import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Article } from './article.entity';
import { User } from './user.entity';

@Entity()
export class Comment extends BaseEntity {
    @Column()
    articleId: string;

    @ManyToOne(() => Article, (article) => article.comments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'articleId' })
    article: Article;

    @Column()
    userId: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    author: User;

    @Column({ type: 'text' })
    content: string;
}
