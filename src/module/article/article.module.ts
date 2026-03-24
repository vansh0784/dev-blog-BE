import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';

@Module({
  imports: [AuthModule],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService],
})
export class ArticleModule {}
