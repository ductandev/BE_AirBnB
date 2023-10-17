import { Module } from '@nestjs/common';
import { BookRoomService } from './book-room.service';
import { BookRoomController } from './book-room.controller';

@Module({
  controllers: [BookRoomController],
  providers: [BookRoomService],
})
export class BookRoomModule {}
