import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { PrismaService } from 'src/prisma.service';
import { Chat } from '@prisma/client';

@Injectable()
export class ChatsService {

  constructor(private prisma: PrismaService) { }

  async create(createChatDto: CreateChatDto): Promise<Chat> {
    try {
      return this.prisma.chat.create({ data: createChatDto });
      
    } catch (error) {
      throw error;
    }
  }

  // async findAll(): Promise<Chat[]> {
  //   return this.prisma.chat.findMany();
  // }



  // findOne(id: number) {
  //   return `This action returns a #${id} chat`;
  // }

  // update(id: number, updateChatDto: UpdateChatDto) {
  //   return `This action updates a #${id} chat`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} chat`;
  // }
}
