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
}
