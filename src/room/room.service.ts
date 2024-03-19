import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Response } from 'express';
import { errorCode, failCode, successCode } from 'src/Config/response';

import * as fs from 'fs';
import { CreateRoomDto } from './dto/create-room.dto';
import { FileUploadDto } from './dto/upload.dto';

@Injectable()
export class RoomService {
  constructor() { }

  model = new PrismaClient();

  // ============================================
  //                GET ALL ROOM
  // ============================================
  async getAllRoom(res: Response) {
    try {
      let data = await this.model.phong.findMany({
        where: {
          isDelete: false
        }
      });

      if (data.length === 0) {
        return successCode(res, data, 200, "Chưa có dữ liệu phòng nào được tìm thấy !")
      }

      successCode(res, data, 200, "Thành công !")
    }
    catch (exception) {
      // console.log("🚀 ~ file: phong.service.ts:31 ~ PhongService ~ getAllRoom ~ exception:", exception)
      errorCode(res, "Lỗi BE !")
    }
  }



  // ============================================
  //             GET DETAIL ROOM ID
  // ============================================
  async getDetailRoomId(roomID, res: Response) {
    try {
      let data = await this.model.phong.findFirst({
        where: {
          phong_id: +roomID,
          isDelete: false
        }
      });

      if (data === null) {
        return failCode(res, data, 400, "Phòng ID không tồn tại !")
      }

      successCode(res, data, 200, "Thành công")
    }
    catch (exception) {
      // console.log("🚀 ~ file: phong.service.ts:57 ~ PhongService ~ getDetailRoomId ~ exception:", exception)
      errorCode(res, "Lỗi BE !")
    }
  }


  // ============================================
  //         GET LIST ROOM BY LOCATION ID
  // ============================================
  async getListRoomByLocationId(locationID: number, res: Response) {
    try {
      let data = await this.model.viTri.findFirst({
        where: {
          vi_tri_id: +locationID,
          isDelete: false
        },
        include: {
          Phong: true
        }
      });

      if (data === null) {
        return failCode(res, '', 400, "Vị trí ID không tồn tại !")
      }

      if (data.Phong.length === 0) {
        return successCode(res, data, 200, "Vị trí này chưa thêm phòng nào !")
      }

      successCode(res, data, 200, "Thành công !")
    }
    catch (exception) {
      // console.log("🚀 ~ file: phong.service.ts:89 ~ PhongService ~ getListRoomByLocationId ~ exception:", exception)
      errorCode(res, "Lỗi BE !")
    }
  }


  // ============================================
  //         GET PANIGATION LIST ROOM
  // ============================================
  async getPanigationRoom(pageIndex: number, pageSize: number, res: Response) {
    try {
      let index = (pageIndex - 1) * pageSize;
      if (index < 0) {
        return failCode(res, '', 400, "pageIndex phải lớn hơn 0 !")
      };

      let data = await this.model.phong.findMany({
        skip: +index,     // Sử dụng skip thay vì offset
        take: +pageSize,  // Sử dụng take thay vì limit
        where: {
          isDelete: false,
        }
      });

      if (data.length === 0) {
        return successCode(res, data, 200, "Không có dữ liệu nào được tìm thấy !")
      }

      successCode(res, data, 200, "Thành công !")
    }
    catch (exception) {
      // console.log("🚀 ~ file: phong.service.ts:121 ~ PhongService ~ getPanigationRoom ~ exception:", exception)
      errorCode(res, "Lỗi BE")
    }
  }


  // ============================================
  //                POST ROOM
  // ============================================
  async postRoom(body: CreateRoomDto, res: Response) {
    try {
      let { vi_tri_id } = body;

      let checkPosition = await this.model.viTri.findFirst({
        where: {
          vi_tri_id,
          isDelete: false
        }
      });

      if (checkPosition === null) {
        return failCode(res, '', 400, "Vị trí ID không tồn tại !")
      }

      await this.model.phong.create({
        data: body
      })

      successCode(res, body, 201, "Thêm phòng thành công !")
    }
    catch (exception) {
      // console.log("🚀 ~ file: phong.service.ts:152 ~ PhongService ~ postRoom ~ exception:", exception)
      errorCode(res, "Lỗi BE")
    }
  }


  // ============================================
  //             UPLOAD ROOM IMAGE
  // ============================================
  async uploadImgRoom(files: Express.Multer.File[], body: FileUploadDto, roomID: number, res: Response) {
    try {
      let checkRoomID = await this.model.phong.findFirst({
        where: {
          phong_id: +roomID,
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

        return failCode(res, '', 400, "Phòng ID không tồn tại !")
      }

      // Lấy danh sách tên file từ mảng files
      const fileNames = JSON.stringify(files.map((file) => file.filename)); //['A.jpg', 'B.jpg'] => biến thành một chuỗi JSON hợp lệ: ["A.jpg", "B.jpg"]

      await this.model.phong.update({
        where: {
          phong_id: +roomID,
        },
        data: {
          hinh_anh: fileNames
        }
      });

      successCode(res, files, 201, 'Thêm ảnh phòng thành công !');
    }
    catch (exception) {
      console.log("🚀 ~ file: room.service.ts:193 ~ RoomService ~ uploadImgRoom ~ exception:", exception)
      errorCode(res, "Lỗi BE")
    }
  }


  // ============================================
  //                PUT ROOM
  // ============================================
  async putRoom(roomID: number, body: CreateRoomDto, res: Response) {
    try {
      let { vi_tri_id, ten_phong, phong_ngu, giuong, phong_tam, mo_ta, gia_tien, may_giat, ban_la, tivi, dieu_hoa, wifi, bep, do_xe, ho_boi, ban_ui } = body;

      let checkRoom = await this.model.phong.findFirst({
        where: {
          phong_id: +roomID,
          vi_tri_id,
          isDelete: false
        }
      });

      if (checkRoom === null) {
        return failCode(res, '', 400, "Phòng ID không tồn tại hoặc vị trí ID không tồn tại !")
      }

      await this.model.phong.update({
        where: {
          phong_id: +roomID,
          vi_tri_id,
        },
        data: {
          vi_tri_id,
          ten_phong,
          phong_ngu,
          giuong,
          phong_tam,
          mo_ta,
          gia_tien,
          may_giat,
          ban_la,
          tivi,
          dieu_hoa,
          wifi,
          bep,
          do_xe,
          ho_boi,
          ban_ui
        }
      });

      successCode(res, body, 201, "Cập nhật phòng thành công !")
    }
    catch (exception) {
      console.log("🚀 ~ file: phong.service.ts:190 ~ PhongService ~ putRoom ~ exception:", exception)
      errorCode(res, "Lỗi BE")
    }
  }


  // ============================================
  //                DELETE ROOM
  // ============================================
  async deleteRoom(roomID: number, res: Response) {
    try {
      let checkRoomID = await this.model.phong.findFirst({
        where: {
          phong_id: +roomID,
          isDelete: false
        }
      });

      if (checkRoomID === null) {
        return failCode(res, checkRoomID, 400, "Room ID không tồn tại !")
      }

      await this.model.phong.update({
        where: {
          phong_id: +roomID
        },
        data: {
          isDelete: true
        }
      });

      successCode(res, checkRoomID, 200, "Thành công !")
    }
    catch (exception) {
      console.log("🚀 ~ file: phong.service.ts:239 ~ PhongService ~ deleteRoom ~ exception:", exception)
      errorCode(res, "Lỗi BE !")
    }
  }


}
