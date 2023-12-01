import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { UpdateResult } from 'typeorm';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  public async all(): Promise<User[] | Error> {
    return await this.userService.getAll();
  }

  @Get(':id')
  public async one(@Param('id') id: string): Promise<User | Error> {
    return await this.userService.getOne(id);
  }

  @Post()
  public async create(
    @Body() createBody: CreateUserDto,
  ): Promise<User | Error> {
    return await this.userService.create(createBody);
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateBody: UpdateUserDto,
  ): Promise<UpdateResult | Error> {
    return await this.userService.update(id, updateBody);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string) {
    return await this.userService.delete(id);
  }
}
