import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsNotEmpty, IsNumber } from 'class-validator';

@InputType('createPostInput')
export class CreatePostDto {
  @IsNumber()
  @IsNotEmpty({ message: 'A post should contain a creator' })
  @IsDefined({ message: 'A post should contain a creator' })
  @Field()
  createdBy: number;

  @IsNotEmpty({ message: 'A post should contain a title' })
  @IsDefined({ message: 'A post should contain a title' })
  @Field()
  title: string;

  @IsNotEmpty({ message: 'A post should contain a content' })
  @IsDefined({ message: 'A post should contain a content' })
  @Field()
  content: string;
}
