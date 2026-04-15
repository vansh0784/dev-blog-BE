import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentType } from './types/output.comment.type';
import { CreateComment, UpdateComment } from './types/input.comment.type';
import { BaseResponse } from '../auth/types/auth.object.type';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { Comment } from 'src/entities/comment.entity';

@Resolver(() => Comment)
export class CommentResolver {
    constructor(private readonly commentService: CommentService) {}

    @UseGuards(GqlAuthGuard)
    @Mutation(() => CommentType)
    async createComment(@Args('data') data: CreateComment, @Context() ctx): Promise<Comment> {
        return this.commentService.createComment(data, ctx?.req?.user?.id);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => CommentType)
    async updateComment(@Args('data') data: UpdateComment, @Context() ctx): Promise<Comment> {
        return this.commentService.updateComment(data, ctx?.req?.user?.id);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => BaseResponse)
    async deleteComment(@Args('id') id: string, @Context() ctx): Promise<BaseResponse> {
        return this.commentService.deleteComment(id, ctx?.req?.user?.id);
    }
}
