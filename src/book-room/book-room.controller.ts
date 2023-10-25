import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, Res, Put } from '@nestjs/common';
import { BookRoomService } from './book-room.service';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

import { CreateBookRoomDto } from './dto/create-book-room.dto';

import { Role } from 'src/user/entities/role.enum';
import { Roles } from 'src/decorators/roles.decorator';

import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AuthorizationGuard } from 'src/guards/authorization.guard';


@ApiBearerAuth()        
// @UseGuards(AuthGuard("jwt"))
@UseGuards(AuthenticationGuard, AuthorizationGuard)
@ApiTags("DatPhong")
@Controller('api/')
export class BookRoomController {
  constructor(private readonly bookRoomService: BookRoomService) {}

  // ============================================
  //          GET ALL INFO BOOK ROOM
  // ============================================
  @HttpCode(200)
  @Roles(Role.ADMIN)
  @Get("get-all-info-book-room")
  getAllInfoBookRoom(@Res() res:Response){
    return this.bookRoomService.getAllInfoBookRoom(res)
  }


  // ============================================
  //    GET ALL INFO BOOK ROOM BY USER ID
  // ============================================ 
  @HttpCode(200)
  @Roles(Role.ADMIN, Role.USER)
  @Get("get-all-info-book-room-by-user-id/:userID")
  getAllInfoBookRoomByUserId(@Param("userID") userID:number, @Res() res: Response){
    return this.bookRoomService.getAllInfoBookRoomByUserId(userID, res)
  }


  // ============================================
  //     GET ALL INFO BOOK ROOM BY ROOM ID
  // ============================================
  @HttpCode(200)
  @Roles(Role.ADMIN)
  @Get("get-all-info-book-room-by-room-id/:roomID")
  getAllInfoBookRoomByRoomId(@Param("roomID") roomID: number,@Res() res:Response){
    return this.bookRoomService.getAllInfoBookRoomByRoomId(roomID, res)
  }


  // ============================================
  //               POST BOOK ROOM
  // ============================================
  @HttpCode(201)
  @Roles(Role.USER)
  @Post("post-book-room")
  postBookRoom(@Body() body: CreateBookRoomDto, @Res() res:Response){
    return this.bookRoomService.postBookRoom(body, res)
  }

  // ============================================
  //               PUT BOOK ROOM
  // ============================================
  @HttpCode(200)
  @Roles(Role.USER)
  @Put("put-book-room/:bookRoomID")
  putBookRoomById(@Param("bookRoomID") bookRoomID:number ,@Body() body: CreateBookRoomDto, @Res() res:Response){
    return this.bookRoomService.putBookRoomById(bookRoomID, body, res)
  }


  // ============================================
  //      DELETE BOOK ROOM BY BOOK ROOM ID
  // ============================================
  @HttpCode(200)
  @Roles(Role.ADMIN, Role.USER)
  @Delete("delete-book-room/:bookRoomID")
    deleteBookRoomById(@Param("bookRoomID") bookRoomID:number, @Res() res:Response){
    return this.bookRoomService.deleteBookRoomById(bookRoomID, res)
  }
}
