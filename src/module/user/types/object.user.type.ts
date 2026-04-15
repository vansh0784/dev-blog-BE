import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserType {
    @Field()
    userName: string;

    @Field()
    email: string;

    @Field()
    role: string;
}

@ObjectType()
export class UserProfile {
    @Field()
    id: string;

    @Field()
    userName: string;

    @Field()
    email: string;

    @Field()
    role: string;

    @Field()
    isActive: boolean;

    @Field()
    lastLoginAt: Date;
}
