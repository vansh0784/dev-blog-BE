import { Module } from '@nestjs/common';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './module/auth/auth.module';
import { CommentModule } from './module/comment/comment.module';
import { ArticleModule } from './module/article/article.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './config/database.config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './module/user/user.module';
import { CommonModule } from './common/common.module';
@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
        TypeOrmModule.forRootAsync({ useClass: DatabaseConfig }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: true,
            path: '/graphql',
        }),
        CommonModule,
        AuthModule,
        CommentModule,
        ArticleModule,
        UserModule,
    ],
    providers: [AppService, AppResolver],
})
export class AppModule {}
