import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from 'src/entities/tag.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class TagDbService {
    constructor(@InjectRepository(Tag) private readonly tagRepository: Repository<Tag>) {}

    async createTag(data: string[]): Promise<Tag[]> {
        const tags = data.map((tag) => this.tagRepository.create({ name: tag }));
        return await this.tagRepository.save(tags);
    }

    async findTag(tags: string[]): Promise<Tag[]> {
        return this.tagRepository.find({ where: { name: In(tags) } });
    }
}
