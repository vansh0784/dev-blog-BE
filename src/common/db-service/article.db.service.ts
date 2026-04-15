import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from 'src/entities/article.entity';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class ArticleDbService {
    constructor(
        @InjectRepository(Article)
        private articleRepository: Repository<Article>,
    ) {}

    async create(data: DeepPartial<Article>): Promise<Article> {
        const article = this.articleRepository.create(data);
        return this.articleRepository.save(article);
    }

    async findArticleBySlug(slug: string): Promise<Article | null> {
        return this.articleRepository.findOne({ where: { slug } });
    }

    async findArticleById(id: string): Promise<Article | null> {
        return this.articleRepository.findOne({ where: { id } });
    }

    async updateArticle(id: string, data: Partial<Article>): Promise<void> {
        await this.articleRepository.update(id, data);
    }

    async deleteArticle(id: string): Promise<boolean> {
        const result = await this.articleRepository.delete(id);
        return (result.affected ?? 0) > 0;
    }

    async getPaginatedArticle(limit: number, cursor?: { createdAt: string; slug: string }, authorId?: string) {
        const qb = this.articleRepository
            .createQueryBuilder('article')
            .orderBy('article.createdAt', 'DESC')
            .addOrderBy('article.slug', 'DESC')
            .take(limit + 1);

        if (cursor) {
            qb.andWhere(`(article.createdAt < :createdAt OR (article.createdAt = :createdAt AND article.slug < :slug))`, { createdAt: cursor.createdAt, slug: cursor.slug });
        }
        if (authorId) {
            qb.andWhere('article.authorId = :authorId', { authorId });
        }
        const result = await qb.getMany();

        const hasNextPage = result.length > limit;
        const data = hasNextPage ? result.slice(0, limit) : result;

        const nextCursor = hasNextPage && data.length > 0 ? { createdAt: data[data.length - 1].createdAt, slug: data[data.length - 1].slug } : null;

        return { data, nextCursor, hasNextPage };
    }
}
