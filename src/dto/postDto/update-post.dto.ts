import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { IsDefined, IsNotEmpty } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType('updatePostInput')
export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsNotEmpty({ message: 'A post should contain a title' })
  @IsDefined({ message: 'A post should contain a title' })
  @Field()
  title: string;

  @IsNotEmpty({ message: 'A post should contain a content' })
  @IsDefined({ message: 'A post should contain a content' })
  @Field()
  content: string;
}
