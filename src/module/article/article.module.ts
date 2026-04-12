import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from 'src/entities/article.entity';
import { ArticleDbService } from 'src/common/services/article.db.service';
import { Tag } from 'src/entities/tag.entity';
import { TagDbService } from 'src/common/services/tag.db.service';
import { ArticleResolver } from './article.resolver';

@Module({
    imports: [TypeOrmModule.forFeature([Article, Tag])],
    providers: [ArticleService, ArticleDbService, TagDbService, ArticleResolver],
    exports: [ArticleService],
})
export class ArticleModule {}
