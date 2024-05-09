import { forwardRef, Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './rest/post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '@/entities/post.entity';
import { UserModule } from '@/user/user.module';
import { UserService } from '@/user/user.service';
import { User } from '@/entities/user.entity';
import { PostResolver } from './graphql/post.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, User]),
    forwardRef(() => UserModule),
  ],
  controllers: [PostController],
  providers: [PostService, UserService, PostResolver],
  exports: [PostService],
})
export class PostModule {}
