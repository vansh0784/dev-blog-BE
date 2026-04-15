import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { UserProfile, UserType } from './types/object.user.type';
import { UseGuards } from '@nestjs/common';
import { UpdateUserInput } from './types/input.user.type';
import { ArticleType } from '../article/types/object.article.types';
import { ArticleService } from '../article/article.service';

@Resolver()
export class UserResolver {
    constructor(
        private readonly userService: UserService,
        private readonly articleService: ArticleService,
    ) {}
    @Mutation(() => UserType)
    @UseGuards(GqlAuthGuard)
    updateProfile(@Args('input') input: UpdateUserInput, @Context() ctx) {
        return this.userService.updateProfile(input, ctx);
    }

    @Query(() => UserProfile)
    @UseGuards(GqlAuthGuard)
    getProfile(@Context() ctx) {
        return this.userService.getProfile(ctx?.req?.user?.userId);
    }

    @Query(() => [ArticleType])
    async articles(@Parent() user: UserProfile) {
        const result = await this.articleService.getArticles({ limit: '10', authorId: user.id });
        return result.data;
    }
}
