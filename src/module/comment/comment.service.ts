import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CommentDbService } from 'src/common/services/comment.db.service';
import { CreateComment, UpdateComment } from './types/input.comment.type';
import { Comment } from 'src/entities/comment.entity';
import { BaseResponse } from '../auth/types/auth.object.type';

@Injectable()
export class CommentService {
    constructor(private readonly commentDbService: CommentDbService) {}

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
}
