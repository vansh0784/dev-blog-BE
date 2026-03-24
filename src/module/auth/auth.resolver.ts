import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthResponse, BaseResponse, UserType } from './types/auth.object.type';
import {
  SignInInput,
  SignupInput,
  UpdateUserInput,
} from './types/auth.input.type';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards/gql-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthResponse)
  signup(@Args('input') input: SignupInput) {
    return this.authService.signup(input);
  }

  @Mutation(() => AuthResponse)
  login(@Args('input') input: SignInInput) {
    return this.authService.login(input);
  }

  @Mutation(() => UserType)
  @UseGuards(GqlAuthGuard)
  updateProfile(@Args('input') input: UpdateUserInput, @Context() ctx) {
    return this.authService.updateProfile(input, ctx);
  }

  @Mutation(() => BaseResponse)
  logout() {
    return { message: 'Logged out successfully!' };
  }
}
