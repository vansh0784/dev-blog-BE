import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
    @Field()
    userName: string;

    @Field()
    password: string;

    @Field()
    email: string;
}
