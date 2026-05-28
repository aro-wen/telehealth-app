/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable prettier/prettier */

import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { WsJwtAuthGuard } from '../auth/guards/ws-jwt-auth.guard';

@WebSocketGateway({
  // ✅ Dev-friendly CORS
  cors: {
    origin: true,
    credentials: true,
  },
  namespace: 'telehealth', // ✅ Must match client connection URL
})
export class NotificationsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private connectedUsers: Map<string, string> = new Map();

  handleConnection(client: Socket) {
    const userId = client.handshake.auth.userId;
    if (userId) {
      this.connectedUsers.set(userId, client.id);
      console.log(`🔌 User ${userId} connected`);
    }
  }

  handleDisconnect(client: Socket) {
    const userId = client.handshake.auth.userId;
    if (userId) {
      this.connectedUsers.delete(userId);
      console.log(`🔌 User ${userId} disconnected`);
    }
  }

  sendToUser(userId: string, event: string, data: any) {
    const socketId = this.connectedUsers.get(userId);
    if (socketId) {
      this.server.to(socketId).emit(event, data);
    }
  }

  sendToDoctors(event: string, data: any) {
    this.server.emit(event, data);
  }

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('join')
  handleJoin(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { role: string },
  ) {
    if (data.role === 'DOCTOR') {
      client.join('doctors');
    }
    return { event: 'joined', data: { room: data.role } };
  }
}
