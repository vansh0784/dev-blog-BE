import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDbService } from 'src/common/db-service/user.db.service';
import { User } from 'src/entities/user.entity';
import { UpdateUserInput } from './types/input.user.type';
import { UserType } from './types/object.user.type';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userDbService: UserDbService) {}
    async updateProfile(data: UpdateUserInput, userPayload: any): Promise<UserType> {
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
        return this.userDbService.update(userId, updateData);
    }

    async getProfile(userId: string) {
        if (!userId) {
            throw new NotFoundException('User id not found');
        }
        return this.userDbService.findById(userId);
    }

    async getArticleByUser(authorId: string) {}
}
