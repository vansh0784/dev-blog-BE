import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { ArticleModule } from '../article/article.module';

@Module({
    imports: [TypeOrmModule.forFeature([User]), ArticleModule],
    providers: [UserResolver, UserService],
    exports: [UserService],
})
export class UserModule {}
