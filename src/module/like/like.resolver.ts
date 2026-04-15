import { Args, Context, Resolver, Query } from '@nestjs/graphql';
import { BaseResponse } from '../auth/types/auth.object.type';
import { ArticleLikeService } from './like.service';

@Resolver()
export class ArticleLikeResolver {
    constructor(private readonly articleLikeService: ArticleLikeService) {}

    @Query(() => BaseResponse)
    async toggleLike(@Args('authorId') authorId: string, @Context() ctx) {
        return this.articleLikeService.toggleLike(authorId, ctx?.req?.user?.id);
    }
}
