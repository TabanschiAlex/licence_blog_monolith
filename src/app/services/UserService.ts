import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/User';
import { CreateUserRequest } from '../requests/user/CreateUserRequest';
import { BasicQueryRequest } from '../requests/BasicQueryRequest';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  public async getAllUsers(query: BasicQueryRequest): Promise<User[]> {
    const skip = query?.page ? (query?.page?.number - 1) * query?.page?.number : 0;
    const take = query?.page?.size ?? 10;

    return await this.userRepository.find({ skip, take });
  }

  public async storeUser(request: CreateUserRequest): Promise<User> {
    const user = new User();

    user.email = request.email;
    user.password = await this.hashPassword(request.password);
    user.role = request.role;
    user.name = request.name;

    return await this.userRepository.save(user);
  }

  public async updateUser(uuid: string, request: QueryDeepPartialEntity<User>): Promise<UpdateResult> {
    return await this.userRepository.update({ uuid: uuid }, request);
  }

  public async updateName(uuid: string, name: string): Promise<UpdateResult> {
    return await this.userRepository.update({ uuid: uuid }, { name: name });
  }

  public async deleteUser(uuid: string): Promise<DeleteResult> {
    await this.userRepository.findOneOrFail({ uuid: uuid });

    return await this.userRepository.delete({ uuid: uuid });
  }

  public async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email: email } });
  }

  public async getUserByUuid(uuid: string): Promise<User> {
    return await this.userRepository.findOneOrFail({ where: { uuid: uuid } });
  }

  public async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}
