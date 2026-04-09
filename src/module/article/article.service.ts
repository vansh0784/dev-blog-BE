import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ArticleDbService } from 'src/common/services/article.db.service';
import { CreateArticleInput, UpdateArticleInput } from './types/input.article.types';
import { Article } from 'src/entities/article.entity';
import { BaseResponse } from '../auth/types/auth.object.type';

@Injectable()
export class ArticleService {
    constructor(private articleDbService: ArticleDbService) {}

    private generateSlug(title: string) {
        const baseSlug = title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');

        return `${baseSlug}-${Date.now()}-${randomUUID().slice(0, 6)}`;
    }

    private async validateOwnership(id: string, userId: string): Promise<Article> {
        if (!id) throw new BadRequestException('Article Id not found!');
        const article = await this.articleDbService.findArticleById(id);
        if (!article) throw new NotFoundException('Article not found');
        if (article.authorId !== userId) throw new ForbiddenException('Not allowed');
        return article;
    }

    async createArticle(data: CreateArticleInput, userId: string) {
        const { title, content } = data;
        if (!title && !content) throw new BadRequestException('Invalid content type!');
        if (!userId) throw new BadRequestException('User Id not found');
        const slug = this.generateSlug(title);
        return await this.articleDbService.create({ ...data, slug, authorId: userId });
    }

    async updateArticle(data: UpdateArticleInput, userId: string): Promise<BaseResponse> {
        const { id, ...rest } = data;
        await this.validateOwnership(id, userId);
        await this.articleDbService.updateArticle(id, rest);
        return { statusCode: 200, message: 'Article updated successfully' };
    }

    async findArticleById(id: string): Promise<Article> {
        if (!id) throw new BadRequestException('Article Id not found!');
        return this.articleDbService.findArticleById(id);
    }

    async findArticleBySlug(slug: string): Promise<Article> {
        if (!slug) throw new BadRequestException('Article slug not found!');
        return this.articleDbService.findArticleBySlug(slug);
    }

    async deleteArticle(id: string, userId: string): Promise<BaseResponse> {
        if (!id) throw new BadRequestException('Article Id not found!');
        await this.validateOwnership(id, userId);
        await this.articleDbService.deleteArticle(id);
        return { statusCode: 200, message: 'Article deleted successfully' };
    }
}
