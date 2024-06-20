import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { ChatsService } from './chats.service';
import { Server } from 'socket.io';
import { CreateChatDto } from './dto/create-chat.dto';

@WebSocketGateway({ cors: true })
export class ChatsGateway {
  
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatsService: ChatsService) {
  }

  // afterInit(server: Server) {
  //   console.log('Initialized Chat');
  // }

  // handleConnection(client: any, ...args: any[]) {
  //   // console.log('Client connected:', client.id);
  // }


  @SubscribeMessage('message')
  async handleMessage(@MessageBody() message: CreateChatDto): Promise<void> {
    console.log(message)
    const savedMessage = await this.chatsService.create(message);
    this.server.emit('message', savedMessage); // Broadcast message to all connected clients

  }

  // @SubscribeMessage('get-chats')
  // async getChats() {
  //   return this.chatsService.findAll();
  // }
}
