// Input type is something that client send to the server
import { InputType, Field } from '@nestjs/graphql';
import { ROLE } from 'src/entities/user.entity';

@InputType()
export class SignupInput {
  @Field()
  userName: string;

  @Field()
  password: string;

  @Field()
  email: string;

  @Field({ defaultValue: ROLE.user })
  role: string;
}

@InputType()
export class SignInInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class UpdateUserInput {
  @Field()
  userName: string;

  @Field()
  password: string;

  @Field()
  email: string;
}
