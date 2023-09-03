import { Injectable } from '@nestjs/common';
import { connect, Connection, Channel } from 'amqplib';

@Injectable()
export class RabbitMQService {
    private connection: Connection;
    private channel: Channel;

    async connect(): Promise<void> {
        this.connection = await connect('amqp://localhost');
        this.channel = await this.connection.createChannel();
    }

    async publishMessage(queue: string, message: string): Promise<void> {
        await this.channel.assertQueue(queue);
        this.channel.sendToQueue(queue, Buffer.from(message));
    }

    async consumeMessages(queue: string, callback: (message: string) => void): Promise<void> {
        await this.channel.assertQueue(queue);
        this.channel.consume(queue, (msg) => {
            if (msg !== null) {
                const message = msg.content.toString();
                callback(message);
                this.channel.ack(msg);
            }
        });
    }

    async closeConnection(): Promise<void> {
        await this.channel.close();
        await this.connection.close();
    }
}