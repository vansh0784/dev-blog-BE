import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleLike } from 'src/entities/article.like.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleLikeDbService {
    constructor(@InjectRepository(ArticleLike) private readonly articleLikeRepository: Repository<ArticleLike>) {}

    private getLikeDetail(articleId: string, userId: string) {
        return this.articleLikeRepository.findOne({ where: { articleId, userId } });
    }

    async getCountValue(articleId: string) {
        return this.articleLikeRepository.count({ where: { articleId } });
    }

    async toggleLike(articleId: string, userId: string) {
        const existingLike = await this.getLikeDetail(articleId, userId);
        if (existingLike) {
            await this.articleLikeRepository.delete(existingLike.id);
            return false;
        }
        const like = this.articleLikeRepository.create({
            articleId,
            userId,
        });
        await this.articleLikeRepository.save(like);
        return true;
    }
}
