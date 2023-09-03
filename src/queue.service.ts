import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class QueueService {
    constructor(@Inject('BOOK_API_SERVICE') private readonly client: ClientProxy) { }

    async sendToQueue(name: string, data: any, authorization: string) {
        await this.client.connect();

        console.log(name, data, authorization);
        const payload = {
            data,
            headers: {
                'Authorization': `Bearer ${authorization}`,
            },
        };

        console.log(payload)
        await this.client.emit(name, payload).toPromise();

        await this.client.close();
    }
}