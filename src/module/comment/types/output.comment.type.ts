import { ObjectType, Field, ID } from '@nestjs/graphql';
import { BaseEntity, Entity } from 'typeorm';

@ObjectType()
@Entity()
export class CommentEntity extends BaseEntity {
    @Field(() => ID)
    id: string;

    @Field()
    articleId: string;

    @Field()
    userId: string;

    @Field()
    content: string;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}
