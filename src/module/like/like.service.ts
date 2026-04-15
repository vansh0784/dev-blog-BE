import { BadRequestException, Injectable } from '@nestjs/common';
import { ArticleLikeDbService } from 'src/common/db-service/article.like.entity';

@Injectable()
export class ArticleLikeService {
    constructor(private readonly articleLikeDbService: ArticleLikeDbService) {}

    async getCountValue(articleId: string) {
        return this.articleLikeDbService.getCountValue(articleId);
    }

    async toggleLike(articleId: string, userId: string) {
        if (!articleId || !userId) throw new BadRequestException('Article id is missing');
        return this.articleLikeDbService.toggleLike(articleId, userId);
    }
}
