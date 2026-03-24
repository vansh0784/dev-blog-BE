import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Article } from 'src/entities/article.entity';
import { Comment } from 'src/entities/comment.entity';
import { Tag } from 'src/entities/tag.entity';
import { User } from 'src/entities/user.entity';

@Injectable()
export class DatabaseConfig implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('DB_HOST'),
      password: this.configService.get<string>('DB_PASSWORD'),
      port: this.configService.get<number>('DB_PORT'),
      database: this.configService.get<string>('DB_NAME'),
      username: this.configService.get<string>('DB_USERNAME'),
      synchronize: this.configService.get<boolean>('DB_SYNC'),
      logging: this.configService.get<boolean>('DB_LOGGING'),
      autoLoadEntities: true,
      entities: [User, Article, Comment, Tag],
      migrationsRun: false,
    };
  }
}
