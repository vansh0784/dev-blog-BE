import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { User } from './user.entity';
import { Article } from './article.entity';
import { BaseEntity } from './base.entity';

@Entity()
@Unique(['articleId', 'userId'])
export class ArticleLike extends BaseEntity {
    @Column()
    articleId: string;

    @ManyToOne(() => Article, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'articleId' })
    article: ArticleLike;

    @Column()
    userId: string;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;
}
