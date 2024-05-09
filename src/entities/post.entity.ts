import { User } from '@/entities/user.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Post {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string;

  @Field()
  @Column({ type: 'text', nullable: false })
  content: string;

  @Field(() => User, { nullable: false })
  @JoinColumn({ name: 'createdById' })
  @ManyToOne(() => User, (user) => user.posts, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  createdBy: User;

  @Column()
  @Field()
  createdById: number;
}
