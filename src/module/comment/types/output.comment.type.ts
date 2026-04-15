import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UserType } from 'src/module/user/types/object.user.type';

@ObjectType()
export class CommentType {
    @Field(() => ID)
    id: string;

    @Field()
    articleId: string;

    @Field()
    userId: string;

    @Field(() => UserType)
    author: UserType;

    @Field()
    content: string;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}
