import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/common/services/user.db.service';
import {
  SignInInput,
  SignupInput,
  UpdateUserInput,
} from './types/auth.input.type';
import { AuthResponse, UserType } from './types/auth.object.type';
import { hash, compare } from 'bcrypt';
import { ROLE } from 'src/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  private generateToken(payload: any): string {
    return this.jwtService.sign(payload);
  }

  async signup(data: SignupInput): Promise<AuthResponse> {
    const existingUser = await this.userService.findByEmail(
      data.email.toLowerCase(),
    );

    if (existingUser) {
      throw new BadRequestException('User already exists!');
    }

    const hashedPassword = await hash(data.password, 10);

    const user = await this.userService.create({
      email: data.email.toLowerCase(),
      password: hashedPassword,
      userName: data.userName,
      role: ROLE.user,
      isActive: true,
    });

    const token = this.generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return { token, user };
  }

  async login(data: SignInInput): Promise<AuthResponse> {
    const existingUser = await this.userService.findByEmail(data.email);
    if (!existingUser) throw new UnauthorizedException('User not found!!');

    if (existingUser && !(await compare(data.password, existingUser.password)))
      throw new UnauthorizedException('Invalid Credentials!');

    const token = this.generateToken({
      userId: existingUser.id,
      email: existingUser.email,
      role: existingUser.role,
    });
    await this.userService.update(existingUser.id, {
      lastLoginAt: new Date(),
    });
    return { token, user: existingUser };
  }

  async updateProfile(
    data: UpdateUserInput,
    userPayload: any,
  ): Promise<UserType> {
    const userId = userPayload.userId;

    const updateData: any = {};
    if (data.email) {
      updateData.email = data.email.toLowerCase();
    }
    if (data.userName) {
      updateData.userName = data.userName;
    }
    if (data.password) {
      updateData.password = await hash(data.password, 10);
    }
    return this.userService.update(userId, updateData);
  }
}
