import { CreateUserDto } from '@/dto/userDto/create-user.dto';
import { UpdateUserDto } from '@/dto/userDto/update-user.dto';
import { Post } from '@/entities/post.entity';
import { User } from '@/entities/user.entity';
import { PostService } from '@/post/post.service';
import { UserService } from '@/user/user.service';
import {
  Resolver,
  Query,
  ResolveField,
  Parent,
  Mutation,
  Args,
  Int,
} from '@nestjs/graphql';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}

  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Query(() => User)
  async getUser(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return await this.userService.findOne(id);
  }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') user: CreateUserDto) {
    return await this.userService.create(user);
  }

  @Mutation(() => User)
  async updateUser(@Args('updateUserInput') user: UpdateUserDto) {
    return await this.userService.update(user.id, user);
  }

  @Mutation(() => User)
  async deleteUser(@Args('id', { type: () => Int }) id: number) {
    return await this.userService.remove(id);
  }

  @ResolveField(() => [Post])
  async posts(@Parent() user: User) {
    return this.postService.findAllByUser(user.id);
  }
}
