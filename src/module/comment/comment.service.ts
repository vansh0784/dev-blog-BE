import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CommentDbService } from 'src/common/db-service/comment.db.service';
import { CreateComment, UpdateComment } from './types/input.comment.type';
import { Comment } from 'src/entities/comment.entity';
import { BaseResponse } from '../auth/types/auth.object.type';
import { CursorService } from 'src/common/utils/cursor.service';

@Injectable()
export class CommentService {
    constructor(
        private readonly commentDbService: CommentDbService,
        private cursorService: CursorService,
    ) {}

    private async validateOwnership(id: string, userId: string): Promise<Comment> {
        if (!id || !userId) throw new BadRequestException('Comment ID and User ID are required');
        const comment = await this.commentDbService.findComment(id);
        if (!comment) throw new NotFoundException('Comment not found');
        if (comment.userId !== userId) throw new ForbiddenException('You are not allowed to modify this comment');
        return comment;
    }

    async createComment(data: CreateComment, userId: string): Promise<Comment> {
        const { articleId } = data;
        if (!articleId) throw new BadRequestException('Article ID is required');
        return this.commentDbService.createComment({ ...data, articleId, userId });
    }

    async updateComment(data: UpdateComment, userId: string): Promise<Comment> {
        const { id, content } = data;
        await this.validateOwnership(id, userId);
        return this.commentDbService.updateComment(id, { content });
    }

    async deleteComment(id: string, userId: string): Promise<BaseResponse> {
        await this.validateOwnership(id, userId);
        await this.commentDbService.deleteComment(id);
        return { statusCode: 200, message: 'Comment deleted successfully!' };
    }

    async getCommentsByArticleId(articleId: string, limit = 10, cursor?: string) {
        let decodedCursor: { createdAt: string; id: string } | null = null;
        if (cursor) decodedCursor = this.cursorService.decode(cursor);

        const { totalCount, comments } = await this.commentDbService.getCommentsByArticleId(articleId, limit, decodedCursor);
        const hasNextPage = comments.length > limit;

        if (hasNextPage) comments.pop();
        const lastItem = comments[comments.length - 1];
        const nextCursor = hasNextPage && lastItem ? this.cursorService.encode({ createdAt: lastItem.createdAt, id: lastItem.id }) : null;

        return { items: comments, hasNextPage, nextCursor, totalCount };
    }
}
