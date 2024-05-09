import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/userDto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from '@/dto/userDto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user: User = new User();
    user.name = createUserDto.name;

    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user: User = await this.userRepository.findOne({
      where: { id },
      relations: ['posts'],
    });

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user: User = await this.userRepository.findOne({ where: { id } });

    if (!user) throw new Error('User not found');

    user.name = updateUserDto.name ?? user.name;

    return await this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    await this.userRepository.delete(id);

    return user;
  }
}
