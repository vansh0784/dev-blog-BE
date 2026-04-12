import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Article } from './article.entity';

@Entity()
export class Tag extends BaseEntity {
    @Column({ unique: true })
    name: string;

    @Column({ nullable: true, unique: true })
    slug: string;

    @ManyToMany(() => Article, (article) => article.tags)
    articles: Article[];
}
