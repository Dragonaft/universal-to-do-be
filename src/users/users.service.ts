import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserInterface, UpdateUserInterface } from './types';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  public async getAll(): Promise<User[] | Error> {
    const users = await this.userRepository.find();
    if (users) {
      return users;
    } else {
      return new Error('Users not found!');
    }
  }

  public async getOne(id: string): Promise<User | Error> {
    const foundUser = await this.userRepository.findOneBy({ id: id });

    if (foundUser) {
      return foundUser;
    } else {
      return new Error('User not found!');
    }
  }

  public async create(
    createUserBody: CreateUserInterface,
  ): Promise<User | Error> {
    const isUser = await this.userRepository.exist({
      where: { email: createUserBody.email },
    });

    if (isUser) {
      return new Error('User already exists!');
    }

    const newUser = this.userRepository.create({
      ...createUserBody,
      created_at: new Date(),
    });

    return this.userRepository.save(newUser);
  }

  public async update(
    id: string,
    updateUserBody: UpdateUserInterface,
  ): Promise<UpdateResult | Error> {
    const foundUser = await this.userRepository.findOneBy({ id: id });
    if (foundUser) {
      return await this.userRepository.update({ id: id }, updateUserBody);
    } else {
      return new Error('User not found');
    }
  }

  public async delete(id: string): Promise<DeleteResult | Error> {
    const foundUser = await this.userRepository.findOneBy({ id: id });
    if (foundUser) {
      return await this.userRepository.delete({ id: id });
    } else {
      return new Error('User not found');
    }
  }
}
