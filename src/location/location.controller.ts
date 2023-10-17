import { Controller, Get, Post, Body, Param, Delete, UseGuards, HttpCode, Res, UseInterceptors, UploadedFiles, Put } from '@nestjs/common';
import { LocationService } from './location.service';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { FileUploadDto } from 'src/room/dto/upload.dto';
import { CreateLocationDto } from './dto/create-location.dto';


@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
@ApiTags("ViTri")
@Controller('api/')
export class LocationController {
  constructor(private readonly locationService: LocationService) { }

  // ============================================
  //            GET ALL LOCATION
  // ============================================ 
  @HttpCode(200)
  @Get("get-all-location")
  getAllLocation(@Res() res: Response) {
    return this.locationService.getAllLocation(res)
  }

  // ============================================
  //         GET LOCATION DETAIL BY ID
  // ============================================
  @HttpCode(200)
  @Get("get-loation-by-id/:locationID")
  getLocationById(@Param("locationID") locationID: number, @Res() res: Response) {
    return this.locationService.getLocationById(locationID, res)
  }

  // ============================================
  //         GET PANIGATION LOCATION
  // ============================================
  @HttpCode(200)
  @Get("get-panigation-location/:pageIndex/:pageSize")
  getPanigationLocation(
    @Param("pageIndex") pageIndex: number,
    @Param("pageSize") pageSize: number,
    @Res() res: Response
  ) {
    return this.locationService.getPanigationLocation(pageIndex, pageSize, res)
  }

  // ============================================
  //                POST LOCATION
  // ============================================
  @HttpCode(201)
  @Post("post-location")
  postLocation(@Body() body: CreateLocationDto, @Res() res: Response) {
    return this.locationService.postLocation(body, res)
  }

  // ============================================
  //                POST IMG LOCATION
  // ============================================
  @ApiConsumes('multipart/form-data')
  @HttpCode(201)
  @Post("upload-img-location/:locationID")
  @UseInterceptors(
    FilesInterceptor("hinhAnh", 10,                // Tham số 1: key FE gửi lên, và số lượng tối đa hình gửi lên 
      {                                            // Tham số 2: định nghĩa nơi lưu, và lưu tên mới cho file
        storage: diskStorage({
          destination: process.cwd() + "/public/img",
          filename: (req, file, callback) => callback(null, new Date().getTime() + "_" + file.originalname) // null: tham số báo lỗi
        })
      }
    ))    // Sử dụng một middleware, cho phép chèn phía trước khi truy cập API
  uploadImgRoom(
    @UploadedFiles() files: Express.Multer.File[],
    @Param("locationID") locationID: number,
    @Body() body: FileUploadDto,
    @Res() res: Response) {

    return this.locationService.uploadImgRoom(files, body, locationID, res)
  }


  // ============================================
  //                PUT LOCATION
  // ============================================
  @HttpCode(201)
  @Put("put-location/:locationID")
  putLocation(
    @Param("locationID") locationID: number,
    @Body() body: CreateLocationDto,
    @Res() res: Response
  ) {
    return this.locationService.putLocation(locationID, body, res)
  }


  // ============================================
  //               DELETE LOCATION
  // ============================================
  @HttpCode(200)
  @Delete('delete-location/:locationID')
  deleteLocation(@Param("locationID") locationID: number, @Res() res:Response){
    return this.locationService.deleteLocation(locationID, res);
  }
}
