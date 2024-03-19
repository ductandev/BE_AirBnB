import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Response } from 'express';
import { errorCode, failCode, successCode } from 'src/Config/response';

import * as fs from 'fs';
import { FileUploadDto } from 'src/room/dto/upload.dto';
import { CreateLocationDto } from './dto/create-location.dto';


@Injectable()
export class LocationService {
  constructor() { }

  model = new PrismaClient();

  // ============================================
  //            GET ALL LOCATION
  // ============================================ 
  async getAllLocation(res: Response) {
    try {
      let data = await this.model.viTri.findMany({
        where: {
          isDelete: false
        }
      });

      if (data.length === 0) {
        return successCode(res, data, 200, "Không có dữ liệu nào được tìm thấy !")
      }

      successCode(res, data, 200, "Thành công !")
    }
    catch (exception) {
      console.log("🚀 ~ file: location.service.ts:31 ~ LocationService ~ getAllLocation ~ exception:", exception)
      errorCode(res, "Lỗi BE !")
    }
  }

  // ============================================
  //         GET LOCATION DETAIL BY ID
  // ============================================
  async getLocationById(locationID: number, res: Response) {
    try {
      let data = await this.model.viTri.findFirst({
        where: {
          vi_tri_id: +locationID,
          isDelete: false
        }
      });

      if (data === null) {
        return failCode(res, data, 400, "Vị trí ID không tồn tại !")
      }

      successCode(res, data, 200, "Thành công !")
    }
    catch (exception) {
      console.log("🚀 ~ file: location.service.ts:55 ~ LocationService ~ getLocationById ~ exception:", exception)
      errorCode(res, "Lỗi BE")
    }
  }


  // ============================================
  //         GET PANIGATION LOCATION
  // ============================================
  async getPanigationLocation(pageIndex: number, pageSize: number, res: Response) {
    try {
      let index = (pageIndex - 1) * pageSize;
      if (index < 0) {
        return failCode(res, '', 400, "PageIndex phải lớn hơn 0 !")
      }

      let data = await this.model.viTri.findMany({
        skip: +index,
        take: +pageSize,
        where: {
          isDelete: false
        }
      });

      if (data.length === 0) {
        return successCode(res, data, 200, "Không có dữ liệu nào được tìm thấy !")
      }

      successCode(res, data, 200, "Thành công !")
    }
    catch (exception) {
      console.log("🚀 ~ file: location.service.ts:86 ~ LocationService ~ getPanigationLocation ~ exception:", exception)
      errorCode(res, "Lỗi BE !")
    }
  }


  // ============================================
  //                POST LOCATION
  // ============================================
  async postLocation(body: CreateLocationDto, res: Response) {
    try {
      let { ten_vi_tri, tinh_thanh, quoc_gia } = body;

      let checkLocation = await this.model.viTri.findFirst({
        where: {
          ten_vi_tri,
          tinh_thanh,
          isDelete: false
        }
      });

      if (checkLocation !== null) {
        return failCode(res, '', 400, "Vị trí và tỉnh thành này đã tồn tại !")
      }

      let newData = await this.model.viTri.create({
        data: {
          ten_vi_tri,
          tinh_thanh,
          quoc_gia
        }
      });

      successCode(res, newData, 200, "Thành công !")
    }
    catch (exception) {
      console.log("🚀 ~ file: location.service.ts:123 ~ LocationService ~ postLocation ~ exception:", exception)
      errorCode(res, "Lỗi BE !")
    }
  }


  // ============================================
  //                POST IMG LOCATION
  // ============================================
  async uploadImgRoom(files: Express.Multer.File[], body: FileUploadDto, locationID: number, res: Response) {
    try {
      let checkRoomID = await this.model.viTri.findFirst({
        where: {
          vi_tri_id: +locationID,
          isDelete: false
        }
      });

      if (checkRoomID === null) {
        // Lặp qua từng phần tử trong mảng và xóa tệp tin
        files.forEach((file) => {
          fs.unlink(process.cwd() + "/public/img/" + file.filename, (err) => {    // xóa file ảnh theo đường dẫn nếu người dùng ko tồn tại
            if (err) {
              console.error("Error deleting file:", err);
            }
          });
        })

        return failCode(res, '', 400, "Vị trí ID không tồn tại !")
      }

      // Lấy danh sách tên file từ mảng files
      const fileNames = JSON.stringify(files.map((file) => file.filename)); //['A.jpg', 'B.jpg'] => biến thành một chuỗi JSON hợp lệ: ["A.jpg", "B.jpg"]

      await this.model.viTri.update({
        where: {
          vi_tri_id: +locationID,
        },
        data: {
          hinh_anh: fileNames
        }
      });

      successCode(res, files, 201, 'Thêm ảnh vị trí thành công !');
    }
    catch (exception) {
      console.log("🚀 ~ file: location.service.ts:172 ~ LocationService ~ uploadImgRoom ~ exception:", exception)
      errorCode(res, "Lỗi BE")
    }
  }


  // ============================================
  //                POST LOCATION
  // ============================================
  async putLocation(locationID: number, body: CreateLocationDto, res: Response) {
    try {
      let { ten_vi_tri, tinh_thanh, quoc_gia } = body;

      let checkLocation = await this.model.viTri.findFirst({
        where: {
          vi_tri_id: +locationID,
          isDelete: false
        }
      });

      if (checkLocation === null) {
        return failCode(res, '', 400, "Vị trí ID không tồn tại !")
      }

      let newData = await this.model.viTri.update({
        where: {
          vi_tri_id: +locationID
        },
        data: {
          ten_vi_tri,
          tinh_thanh,
          quoc_gia
        }
      });

      successCode(res, newData, 200, "Cập nhật vị trí thành công !")
    }
    catch (exception) {
      console.log("🚀 ~ file: location.service.ts:210 ~ LocationService ~ putLocation ~ exception:", exception)
      errorCode(res, "Lỗi BE !")
    }
  }


  // ============================================
  //               DELETE LOCATION
  // ============================================
  async deleteLocation(locationID: number, res: Response) {
    try {
      let data = await this.model.viTri.findFirst({
        where: {
          vi_tri_id: +locationID,
          isDelete: false
        }
      })

      if (data === null) {
        return failCode(res, '', 400, "Vị trí ID không tồn tại !")
      }

      await this.model.viTri.update({
        where: {
          vi_tri_id: +locationID,
          isDelete: false
        },
        data: {
          isDelete: true
        }
      });

      successCode(res, data, 200, "Xóa vị trí thành công !")
    }
    catch (exception) {
      console.log("🚀 ~ file: location.service.ts:245 ~ LocationService ~ deleteLocation ~ exception:", exception)
      errorCode(res, "Lỗi BE !")
    }
  }

}
