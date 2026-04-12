import { Module } from '@nestjs/common';
import { CommentResolver } from './comment.resolver';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/entities/comment.entity';
import { CommentDbService } from 'src/common/services/comment.db.service';

@Module({
    imports: [TypeOrmModule.forFeature([Comment])],
    providers: [CommentService, CommentResolver, CommentDbService],
    exports: [CommentService],
})
export class CommentModule {}
