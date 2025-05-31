import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto, UpdatePasswordDto } from './user.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  private users: User[] = [];

  getAllUsers(): Omit<User, 'password'>[] {
    return this.users.map((user) => {
      const { id, login, version, createdAt, updatedAt } = user;
      return { id, login, version, createdAt, updatedAt };
    });
  }

  getUserById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  createUser(dto: CreateUserDto): Omit<User, 'password'> {
    const newUser: User = {
      id: uuidv4(),
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(newUser);
    const { id, login, version, createdAt, updatedAt } = newUser;
    return { id, login, version, createdAt, updatedAt };
  }

  updateUserPassword(
    id: string,
    dto: UpdatePasswordDto,
  ): Omit<User, 'password'> | number {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      return -1;
    }
    if (user.password === dto.oldPassword) {
      user.password = dto.newPassword;
      user.version += 1;
      user.updatedAt = Date.now();
      const { id, login, version, createdAt, updatedAt } = user;
      return { id, login, version, createdAt, updatedAt };
    }
    return 0;
  }

  deleteUser(id: string): boolean {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }
}
