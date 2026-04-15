import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleLikeDbService } from 'src/common/db-service/article.like.entity';
import { ArticleLike } from 'src/entities/article.like.entity';
import { ArticleLikeResolver } from './like.resolver';
import { ArticleLikeService } from './like.service';

@Module({
    imports: [TypeOrmModule.forFeature([ArticleLike])],
    providers: [ArticleLikeDbService, ArticleLikeResolver, ArticleLikeService],
    exports: [ArticleLikeService],
})
export class ArticleLikeModule {}
