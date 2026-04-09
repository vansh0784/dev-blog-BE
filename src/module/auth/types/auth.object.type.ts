// Object Type is something that server returns to the client'
import { ObjectType, Field } from '@nestjs/graphql';

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
export class AuthResponse {
    @Field()
    token: string;

    @Field(() => UserType)
    user: UserType;
}

@ObjectType()
export class BaseResponse {
    @Field()
    statusCode: number;

    @Field()
    message: string;
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
