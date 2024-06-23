import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
  ) {}

  async findAll(): Promise<UsersEntity[]> {
    return await this.userRepository.find({
      select: ['id', 'name', 'lastName', 'userName', 'email'],
    });
  }

  async findOneOrFail(
    options: FindOneOptions<UsersEntity>,
  ): Promise<UsersEntity> {
    try {
      return await this.userRepository.findOneOrFail(options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async store(data: CreateUserDto): Promise<UsersEntity> {
    const user = this.userRepository.create(data);
    return await this.userRepository.save(user);
  }

  async update(id: number, data: UpdateUserDto): Promise<UsersEntity> {
    const options: FindOneOptions<UsersEntity> = { where: { id } };
    const user = await this.userRepository.findOneOrFail(options);
    this.userRepository.merge(user, data);
    return await this.userRepository.save(user);
  }

  async destroy(id: number): Promise<void> {
    await this.userRepository.findOneOrFail({ where: { id } });
    await this.userRepository.delete(id);
  }
}
