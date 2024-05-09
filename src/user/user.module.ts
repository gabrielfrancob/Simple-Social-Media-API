import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './rest/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/entities/user.entity';
import { UserResolver } from './graphql/user.resolver';
import { PostModule } from '@/post/post.module';
import { Post } from '@/entities/post.entity';
import { PostService } from '@/post/post.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, User]),
    forwardRef(() => PostModule),
  ],
  controllers: [UserController],
  providers: [UserService, UserResolver, PostService],
  exports: [UserService],
})
export class UserModule {}
