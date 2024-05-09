import { IsAlpha, IsDefined, IsNotEmpty } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType('createUserInput')
export class CreateUserDto {
  @IsAlpha()
  @IsNotEmpty({ message: 'A user should contain a name' })
  @IsDefined({ message: 'A user should contain a name' })
  @Field()
  name: string;
}
