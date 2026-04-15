import { Injectable } from '@nestjs/common';

@Injectable()
export class CursorService {
    encode(payload: object): string {
        return Buffer.from(JSON.stringify(payload)).toString('base64');
    }

    decode<T>(cursor: string): T {
        return JSON.parse(Buffer.from(cursor, 'base64').toString()) as T;
    }
}
