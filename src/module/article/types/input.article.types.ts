import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { ARTICLE_STATUS } from '../../../entities/article.entity';

@InputType()
export class CreateArticleInput {
    @Field()
    title: string;

    @Field()
    slug: string;

    @Field(() => [String])
    tags: string[];

    @Field()
    shortDescription: string;

    @Field()
    content: string;

    @Field({ nullable: true })
    coverImage?: string;

    @Field(() => ARTICLE_STATUS, { nullable: true })
    status?: ARTICLE_STATUS;

    @Field({ nullable: true })
    readingTime?: string;

    @Field()
    authorId: string;
}

@InputType()
export class UpdateArticleInput extends PartialType(CreateArticleInput) {
    @Field()
    id: string;
}

@InputType()
export class DeleteArticleInput {
    @Field(() => ID)
    id: string;
}

@InputType()
export class PaginatedArticle {
    @Field()
    limit: string;

    @Field({ nullable: true })
    cursor?: string;
}
