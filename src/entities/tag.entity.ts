import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Tag extends BaseEntity {
  @Column()
  name: string;

  @Column()
  slug: string;
}
