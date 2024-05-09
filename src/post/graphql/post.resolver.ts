import { Post } from '@/entities/post.entity';
import {
  Args,
  Int,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PostService } from '../post.service';
import { Query } from '@nestjs/graphql';
import { CreatePostDto } from '@/dto/postDto/create-post.dto';
import { UpdatePostDto } from '@/dto/postDto/update-post.dto';
import { User } from '@/entities/user.entity';
import { UserService } from '@/user/user.service';

@Resolver(() => Post)
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService,
  ) {}

  @Query(() => [Post])
  async getPosts(): Promise<Post[]> {
    return await this.postService.findAll();
  }

  @Query(() => Post)
  async getPost(@Args('id', { type: () => Int }) id: number): Promise<Post> {
    return await this.postService.findOne(id);
  }

  @Query(() => [Post])
  async getPostsByUser(
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<Post[]> {
    return await this.postService.findAllByUser(userId);
  }

  @Mutation(() => Post)
  async createPost(@Args('createPostInput') post: CreatePostDto) {
    return await this.postService.create(post);
  }

  @Mutation(() => Post)
  async updatePost(
    @Args('id', { type: () => Int }) id: number,
    @Args('updatePostInput') post: UpdatePostDto,
  ) {
    return await this.postService.update(id, post);
  }

  @ResolveField(() => User)
  async createdBy(@Parent() post: Post): Promise<User> {
    return await this.userService.findOne(post.createdById);
  }
}
