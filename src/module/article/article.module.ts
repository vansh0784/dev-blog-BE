import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from 'src/entities/article.entity';
import { ArticleDbService } from 'src/common/services/article.db.service';

@Module({
    imports: [TypeOrmModule.forFeature([Article])],
    providers: [ArticleService, ArticleDbService],
    exports: [ArticleService],
})
export class ArticleModule {}
