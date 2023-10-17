import { PartialType } from '@nestjs/swagger';
import { CreateBookRoomDto } from './create-book-room.dto';

export class UpdateBookRoomDto extends PartialType(CreateBookRoomDto) {}
