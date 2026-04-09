import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ArticleService } from './article.service';
import { CreateArticleInput, UpdateArticleInput } from './types/input.article.types';
import { ArticleType } from './types/object.article.types';
import { BaseResponse } from '../auth/types/auth.object.type';

@Resolver()
export class ArticleResolver {
    constructor(private readonly articleService: ArticleService) {}

    @Mutation(() => ArticleType)
    createArticle(@Args('input') input: CreateArticleInput, @Context() ctx) {
        return this.articleService.createArticle(input, ctx?.req?.user?.userId);
    }

    @Mutation(() => UpdateArticleInput)
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
    getArticles(@Args() id: string) {
        return this.articleService.findArticleById(id);
    }
}
