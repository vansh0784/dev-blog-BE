import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDbService } from 'src/common/db-service/user.db.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthResolver } from './auth.resolver';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        PassportModule,
        TypeOrmModule.forFeature([User]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET', 'MARCH_2025'),
                signOptions: { expiresIn: '7d' },
            }),
        }),
    ],
    providers: [AuthService, UserDbService, JwtStrategy, AuthResolver],
    exports: [AuthService],
})
export class AuthModule {}
