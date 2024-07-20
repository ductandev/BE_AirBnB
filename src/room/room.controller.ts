import { Controller, Get, Post, Body, Param, Delete, UseGuards, HttpCode, Res, Put, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { RoomService } from './room.service';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { CreateRoomDto } from './dto/create-room.dto';
import { FileUploadDto } from '../room/dto/upload.dto';

import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/user/entities/role.enum';

import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AuthorizationGuard } from 'src/guards/authorization.guard';

@ApiBearerAuth()
// @UseGuards(AuthGuard("jwt"))
@UseGuards(AuthenticationGuard, AuthorizationGuard)
@ApiTags("Phong")
@Controller('api/')
export class RoomController {
  constructor(private readonly roomService: RoomService) { }

  // ============================================
  //                GET ALL ROOM
  // ============================================
  @HttpCode(200)
  @Roles(Role.ADMIN, Role.USER)
  @Get("get-all-room")
  getAllRoom(@Res() res: Response) {
    return this.roomService.getAllRoom(res)
  }

  // ============================================
  //             GET DETAIL ROOM ID
  // ============================================
  @HttpCode(200)
  @Roles(Role.ADMIN, Role.USER)
  @Get("get-room-by-id/:roomID")
  getDetailRoomId(@Param("roomID") roomID: number, @Res() res: Response) {
    return this.roomService.getDetailRoomId(roomID, res)
  }

  // ============================================
  //         GET LIST ROOM BY LOCATION ID
  // ============================================
  @HttpCode(200)
  @Roles(Role.ADMIN, Role.USER)
  @Get("get-list-room-by-location-id/:locationID")
  getListRoomByLocationId(@Param("locationID") locationID: number, @Res() res: Response) {
    return this.roomService.getListRoomByLocationId(locationID, res)
  }


  // ============================================
  //         GET PANIGATION LIST ROOM
  // ============================================
  @HttpCode(200)
  @Roles(Role.ADMIN, Role.USER)
  @Get("get-panigation-room/:pageIndex/:pageSize")
  getPanigationRoom(
    @Param("pageIndex") pageIndex: number,
    @Param("pageSize") pageSize: number,
    @Res() res: Response
  ) {
    return this.roomService.getPanigationRoom(pageIndex, pageSize, res)
  }

  // ============================================
  //                POST ROOM
  // ============================================
  @HttpCode(201)
  @Roles(Role.ADMIN)
  @Post("post-room")
  postRoom(@Body() body: CreateRoomDto, @Res() res: Response) {
    return this.roomService.postRoom(body, res)
  }


  // ============================================
  //             UPLOAD ROOM IMAGE
  // ============================================
  @ApiConsumes('multipart/form-data')
  @HttpCode(201)
  @Roles(Role.ADMIN)
  @Post("upload-img-room/:roomID")
  @UseInterceptors(
    FilesInterceptor("hinhAnh", 10,                // Tham số 1: key FE gửi lên, và số lượng tối đa hình gửi lên 
      {                                             // Tham số 2: định nghĩa nơi lưu, và lưu tên mới cho file
        storage: diskStorage({
          destination: process.cwd() + "/public/img",
          filename: (req, file, callback) => callback(null, new Date().getTime() + "_" + file.originalname) // null: tham số báo lỗi
        })
      }
    ))    // Sử dụng một middleware, cho phép chèn phía trước khi truy cập API
  uploadImgRoom(
    @UploadedFiles() files: Express.Multer.File[],
    @Param("roomID") roomID: number,
    @Body() body: FileUploadDto,
    @Res() res: Response) {

    return this.roomService.uploadImgRoom(files, body, roomID, res)
  }


  // ============================================
  //                PUT ROOM
  // ============================================
  @HttpCode(200)
  @Roles(Role.ADMIN)
  @Put("put-room/:roomID")
  putRoom(@Param("roomID") roomID: number, @Body() body: CreateRoomDto, @Res() res: Response) {
    return this.roomService.putRoom(roomID, body, res)
  }


  // ============================================
  //                DELETE ROOM
  // ============================================
  @HttpCode(200)
  @Roles(Role.ADMIN)
  @Delete("delete-room/:roomID")
  deleteRoom(@Param("roomID") roomID: number, @Res() res: Response) {
    return this.roomService.deleteRoom(roomID, res)
  }
}
