import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

import { JwtStrategy } from './strategy/jwt.strategy';
import { CommentModule } from './comment/comment.module';
import { BookRoomModule } from './book-room/book-room.module';
import { RoomModule } from './room/room.module';
import { LocationModule } from './location/location.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    AuthModule,
    UserModule,
    CommentModule,
    BookRoomModule,
    RoomModule,
    LocationModule],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
