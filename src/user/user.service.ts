import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdatePasswordDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<Omit<User, 'password'>[]> {
    const users = await this.userRepository.find();
    return users.map(({ id, login, version, createdAt, updatedAt }) => ({
      id,
      login,
      version,
      createdAt,
      updatedAt,
    }));
  }

  async getUserById(id: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id } });
  }

  async getUserByLogin(login: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { login } });
  }

  async createUser(dto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const currentTime = Date.now();
    const newUser = this.userRepository.create({
      ...dto,
      version: 1,
      createdAt: currentTime,
      updatedAt: currentTime,
    });
    const savedUser = await this.userRepository.save(newUser);
    const { id, login, version, createdAt, updatedAt } = savedUser;
    return { id, login, version, createdAt, updatedAt };
  }

  async updateUserPassword(
    id: string,
    dto: UpdatePasswordDto,
  ): Promise<Omit<User, 'password'> | number> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      return -1;
    }
    if (user.password === dto.oldPassword) {
      user.password = dto.newPassword;
      user.version += 1;
      user.updatedAt = Date.now();
      await this.userRepository.save(user);
      const { id, login, version, createdAt, updatedAt } = user;
      return { id, login, version, createdAt, updatedAt };
    }
    return 0;
  }

  async deleteUser(id: string): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    return result.affected > 0;
  }
}
