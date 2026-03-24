import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.resolver';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
