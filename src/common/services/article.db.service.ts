import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from 'src/entities/article.entity';
import { CreateArticleInput } from 'src/module/article/types/input.article.types';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleDbService {
    constructor(
        @InjectRepository(Article)
        private articleRepository: Repository<Article>,
    ) {}

    async create(data: CreateArticleInput): Promise<Article> {
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
}
