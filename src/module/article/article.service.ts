import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ArticleDbService } from 'src/common/db-service/article.db.service';
import { CreateArticleInput, PaginatedArticle, UpdateArticleInput } from './types/input.article.types';
import { Article } from 'src/entities/article.entity';
import { BaseResponse } from '../auth/types/auth.object.type';
import { TagDbService } from 'src/common/db-service/tag.db.service';
import { Tag } from 'src/entities/tag.entity';

@Injectable()
export class ArticleService {
    constructor(
        private articleDbService: ArticleDbService,
        private tagDbService: TagDbService,
    ) {}

    private generateSlug(title: string) {
        const baseSlug = title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');

        return `${baseSlug}-${randomUUID().slice(0, 8)}`;
    }

    private encodeToken(payload: Record<string, any>): string {
        return Buffer.from(JSON.stringify(payload)).toString('base64');
    }

    private decodeToken(token: string): { createdAt: string; slug: string } {
        return JSON.parse(Buffer.from(token, 'base64').toString());
    }

    private async validateOwnership(id: string, userId: string): Promise<Article> {
        if (!id) throw new BadRequestException('Article Id not found!');
        const article = await this.articleDbService.findArticleById(id);
        if (!article) throw new NotFoundException('Article not found');
        if (article.authorId !== userId) throw new ForbiddenException('Not allowed');
        return article;
    }

    private async resolveTags(tagsNames: string[]): Promise<Tag[]> {
        if (tagsNames && tagsNames.length > 5) throw new BadRequestException('You can only add 5 tags per article');
        const checkExistingTags = await this.tagDbService.findTag(tagsNames);
        const missingTags = tagsNames.filter((tag) => !checkExistingTags.some((t) => t.name === tag));
        if (!missingTags.length) return checkExistingTags;
        const tags = await this.tagDbService.createTag(missingTags);
        return [...checkExistingTags, ...tags];
    }

    async createArticle(data: CreateArticleInput, userId: string) {
        const { title, content, tags } = data;
        if (!title && !content) throw new BadRequestException('Invalid content type!');
        if (!userId) throw new BadRequestException('User Id not found');
        const slug = this.generateSlug(title);
        const listTags = await this.resolveTags(tags);
        return await this.articleDbService.create({ ...data, slug, authorId: userId, tags: listTags });
    }

    async updateArticle(data: UpdateArticleInput, userId: string): Promise<BaseResponse> {
        const { id, tags, ...rest } = data;
        await this.validateOwnership(id, userId);
        const updatePayload: any = { ...rest };
        if (tags) updatePayload.tags = await this.resolveTags(tags);
        await this.articleDbService.updateArticle(id, updatePayload);
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

    async getArticles(data: PaginatedArticle) {
        const { limit, cursor, authorId } = data;
        let decodedCursor: { createdAt: string; slug: string } | null = null;
        if (cursor) decodedCursor = this.decodeToken(cursor);
        const result = await this.articleDbService.getPaginatedArticle(+limit, decodedCursor, authorId);
        const nextCursor = result.nextCursor ? this.encodeToken(result.nextCursor) : null;
        return { ...result, nextCursor };
    }
}
