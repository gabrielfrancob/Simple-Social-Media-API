import { Injectable } from '@nestjs/common';
import { Post } from '@/entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/entities/user.entity';
import { UserService } from '@/user/user.service';
import { CreatePostDto } from '@/dto/postDto/create-post.dto';
import { UpdatePostDto } from '@/dto/postDto/update-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postService: Repository<Post>,
    private readonly userService: UserService,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const user: User = await this.userService.findOne(createPostDto.createdBy);

    if (!user) return { message: 'User not found' };

    const post = new Post();
    post.title = createPostDto.title;
    post.content = createPostDto.content;
    post.createdBy = user;

    return await this.postService.save(post);
  }

  async findAll(): Promise<Post[]> {
    return await this.postService.find();
  }

  async findAllByUser(userId: number): Promise<Post[]> {
    return await this.postService.find({
      where: { createdBy: { id: userId } },
    });
  }

  async findOne(id: number): Promise<Post> {
    return await this.postService.findOne({ where: { id } });
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const post: Post = await this.postService.findOne({ where: { id } });
    post.title = updatePostDto.title ?? post.title;
    post.content = updatePostDto.content ?? post.content;

    return await this.postService.save(post);
  }

  async remove(id: number) {
    return await this.postService.delete(id);
  }
}
