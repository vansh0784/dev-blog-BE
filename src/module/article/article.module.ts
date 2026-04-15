import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from 'src/entities/article.entity';
import { ArticleDbService } from 'src/common/db-service/article.db.service';
import { Tag } from 'src/entities/tag.entity';
import { TagDbService } from 'src/common/db-service/tag.db.service';
import { ArticleResolver } from './article.resolver';
import { CommentModule } from '../comment/comment.module';
import { ArticleLikeModule } from '../like/like.module';

@Module({
    imports: [TypeOrmModule.forFeature([Article, Tag]), CommentModule, ArticleLikeModule],
    providers: [ArticleService, ArticleDbService, TagDbService, ArticleResolver],
    exports: [ArticleService],
})
export class ArticleModule {}
