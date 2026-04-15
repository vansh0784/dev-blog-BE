import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ArticleService } from './article.service';
import { CreateArticleInput, PaginatedArticle, UpdateArticleInput } from './types/input.article.types';
import { ArticleType, PaginatedCommentsType } from './types/object.article.types';
import { BaseResponse } from '../auth/types/auth.object.type';
import { ArticleLikeService } from '../like/like.service';
import { CommentService } from '../comment/comment.service';

@Resolver(() => ArticleType)
export class ArticleResolver {
    constructor(
        private readonly articleService: ArticleService,
        private readonly articleLikeService: ArticleLikeService,
        private readonly commentService: CommentService,
    ) {}

    @Mutation(() => ArticleType)
    createArticle(@Args('input') input: CreateArticleInput, @Context() ctx) {
        return this.articleService.createArticle(input, ctx?.req?.user?.userId);
    }

    @Mutation(() => ArticleType)
    updateArticle(@Args('input') input: UpdateArticleInput, @Context() ctx) {
        return this.articleService.updateArticle(input, ctx?.req?.user?.userId);
    }

    @Mutation(() => BaseResponse)
    deleteArticle(@Args('id') id: string, @Context() ctx) {
        return this.articleService.deleteArticle(id, ctx?.req?.user?.id);
    }

    @Query(() => ArticleType)
    getArticleById(@Args('id') id: string) {
        return this.articleService.findArticleById(id);
    }

    @Query(() => [ArticleType])
    getArticles(@Args('input') input: PaginatedArticle) {
        return this.articleService.getArticles(input);
    }

    @ResolveField(() => Number)
    async likeCount(@Parent() article: ArticleType): Promise<number> {
        return this.articleLikeService.getCountValue(article.id);
    }

    @ResolveField(() => PaginatedCommentsType)
    async comments(@Parent() article: ArticleType): Promise<PaginatedCommentsType> {
        return this.commentService.getCommentsByArticleId(article.id);
    }
}
