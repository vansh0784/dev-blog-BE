import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/entities/comment.entity';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class CommentDbService {
    constructor(@InjectRepository(Comment) private readonly commentDbService: Repository<Comment>) {}

    async createComment(data: DeepPartial<Comment>): Promise<Comment> {
        const comment = await this.commentDbService.create(data);
        return this.commentDbService.save(comment);
    }

    async updateComment(id: string, comment: Partial<Comment>): Promise<Comment> {
        await this.commentDbService.update(id, comment);
        return this.commentDbService.findOneByOrFail({ id });
    }

    async deleteComment(id: string) {
        return await this.commentDbService.delete(id);
    }

    async findComment(id: string) {
        return this.commentDbService.findOne({ where: { id } });
    }

    async getCommentsByArticleId(articleId: string, limit: number, cursor?: { createdAt: string; id: string }) {
        const qb = this.commentDbService
            .createQueryBuilder('comment')
            .leftJoinAndSelect('comment.author', 'author')
            .where('comment.articleId = :articleId', { articleId })
            .orderBy('comment.createdAt', 'DESC')
            .addOrderBy('comment.id', 'DESC')
            .take(limit + 1);

        if (cursor) {
            qb.andWhere(`(comment.createdAt < :createdAt OR (comment.createdAt = :createdAt AND comment.id < :id))`, { createdAt: cursor.createdAt, id: cursor.id });
        }
        const [comments, _] = await qb.getManyAndCount();

        const totalCount = await this.commentDbService.count({ where: { article: { id: articleId } } });
        return { totalCount, comments };
    }
}
