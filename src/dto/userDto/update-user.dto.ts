import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsDefined, IsNotEmpty, IsNumber } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType('updateUserInput')
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNumber()
  @IsNotEmpty()
  @Field()
  id: number;

  @IsNotEmpty({ message: 'A user should contain a name' })
  @IsDefined({ message: 'A user should contain a name' })
  @Field()
  name: string;
}
