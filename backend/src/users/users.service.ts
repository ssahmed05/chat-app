import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {

    
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const createdUser = await this.prisma.user.create({
        data: {
          name: createUserDto.name,
          email: createUserDto.email,
          password: hashedPassword,
          // Add any other fields from CreateUserDto as needed
        },
      });

      delete createdUser.password; // Optional: Exclude password from returned user
      return createdUser;
    } catch (exp) {
      throw exp;
    }
  }

  async showById(id: number): Promise<User> {
    try {
      const user = await this.prisma.user.findFirst({
        where: { id: id },
        select: {
          id: true,
          name: true,
          email: true,
          password: true,
          created_at: true
        },
      });
    
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { email: email },
        select: {
          id: true,
          name: true,
          email: true,
          password: true,
          created_at: true
        },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

}
