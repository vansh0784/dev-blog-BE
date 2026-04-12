import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateComment {
    @Field()
    articleId: string;

    @Field()
    content: string;
}

@InputType()
export class UpdateComment {
    @Field()
    id: string;

    @Field()
    content: string;
}
