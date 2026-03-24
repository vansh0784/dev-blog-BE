import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './module/auth/auth.module';
import { CommentModule } from './module/comment/comment.module';
import { ArticleModule } from './module/article/article.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './config/database.config';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRootAsync({ useClass: DatabaseConfig }),
    AuthModule,
    CommentModule,
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
