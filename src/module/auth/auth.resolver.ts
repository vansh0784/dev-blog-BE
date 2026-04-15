import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthResponse, BaseResponse } from './types/auth.object.type';
import { SignInInput, SignupInput } from './types/auth.input.type';

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

    @Mutation(() => BaseResponse)
    logout() {
        return { message: 'Logged out successfully!' };
    }
}
