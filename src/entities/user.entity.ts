import { Post } from '@/entities/post.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Field(() => [Post], { nullable: true })
  @OneToMany(() => Post, (post) => post.createdBy, { cascade: true })
  posts?: Post[];
}
