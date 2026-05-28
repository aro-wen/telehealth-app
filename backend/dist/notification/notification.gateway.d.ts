import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private connectedUsers;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    sendToUser(userId: string, event: string, data: any): void;
    sendToDoctors(event: string, data: any): void;
    handleJoin(client: Socket, data: {
        role: string;
    }): {
        event: string;
        data: {
            room: string;
        };
    };
}
