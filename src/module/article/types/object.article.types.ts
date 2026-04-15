import { Field, ObjectType, ID, registerEnumType } from '@nestjs/graphql';
import { ARTICLE_STATUS } from '../../../entities/article.entity';
import { UserType } from '../../user/types/object.user.type';
import { CommentType } from 'src/module/comment/types/output.comment.type';

registerEnumType(ARTICLE_STATUS, {
    name: 'ArticleStatus',
});

@ObjectType()
export class ArticleType {
    @Field(() => ID)
    id: string;

    @Field()
    title: string;

    @Field()
    slug: string;

    @Field()
    shortDescription: string;

    @Field()
    content: string;

    @Field({ nullable: true })
    coverImage?: string;

    @Field(() => ARTICLE_STATUS)
    status: ARTICLE_STATUS;

    @Field()
    viewsCount: number;

    @Field()
    likesCount: number;

    @Field()
    commentsCount: number;

    @Field({ nullable: true })
    readingTime?: string;

    @Field({ nullable: true })
    publishedAt?: Date;

    @Field()
    authorId: string;

    @Field(() => UserType)
    author: UserType;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}

@ObjectType()
export class PaginatedCommentsType {
    @Field(() => [CommentType])
    items: CommentType[];

    @Field(() => Number)
    totalCount: number;

    @Field(() => String, { nullable: true })
    nextCursor?: string;

    @Field(() => Boolean)
    hasNextPage: boolean;
}
