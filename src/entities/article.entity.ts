import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Tag } from './tag.entity';
import { Comment } from './comment.entity';

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

    @OneToMany(() => Comment, (comment) => comment.article)
    comments: Comment[];

    @Column({ nullable: true })
    readingTime: string;

    @Column({ type: 'timestamp', nullable: true })
    publishedAt: Date;

    @Column()
    authorId: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'authorId' })
    author: User;

    @ManyToMany(() => Tag, (tag) => tag.articles)
    @JoinTable({
        name: 'article_tags',
        joinColumn: {
            name: 'articleId',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'tagId',
            referencedColumnName: 'id',
        },
    })
    tags: Tag[];
}
