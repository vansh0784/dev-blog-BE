import { Global, Module } from '@nestjs/common';
import { CursorService } from './utils/cursor.service';

@Global()
@Module({
    providers: [CursorService],
    exports: [CursorService],
})
export class CommonModule {}
