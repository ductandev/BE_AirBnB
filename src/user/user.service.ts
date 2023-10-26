import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { errorCode, failCode, successCode } from 'src/Config/response';
// THƯ VIỆN MÃ HÓA PASSWORD
// yarn add bcrypt
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';

import { UserUpdateDto } from './dto/update-user.dto';
import { FileUploadDto } from './dto/upload.dto';
import { Response } from 'express';


@Injectable()
export class UserService {
  constructor() { }

  model = new PrismaClient();

  
  // ============================================
  //   LẤY THÔNG TIN CHI TIẾT TẤT CẢ NGƯỜI DÙNG
  // ============================================
  async getInforAllUser(res: Response) {
    try {
      let data = await this.model.nguoiDung.findMany({
        where: {
          isDelete: false
        }
      });

      if (data.length === 0) {
        return failCode(res, data, 400, "Chưa có người dùng nào được thêm vào dữ liệu!")
      }

      successCode(res, data, 200, "Thành công !")
    }
    catch (exception) {
      console.log("🚀 ~ file: user.service.ts:31 ~ UserService ~ getInforAllUser ~ exception:", exception)
      errorCode(res, "Lỗi BE")
    }
  }
  

  // ============================================
  // LẤY THÔNG TIN CHI TIẾT NGƯỜI DÙNG BY USER_ID
  // ============================================
  async getInfoUserByUserId(userId: string, res: Response) {
    try {
      let data = await this.model.nguoiDung.findFirst({
        where: {
          nguoi_dung_id: +userId,
          isDelete: false
        }
      });

      if (data === null) {
        return failCode(res, data, 400, "Người dùng không tồn tại !")
      }

      successCode(res, data, 200, "Thành công !")
    }
    catch (exception) {
      console.log("🚀 ~ file: user.service.ts:56 ~ UserService ~ getInfoUserByUserId ~ exception:", exception)
      errorCode(res, "Lỗi BE")
    }
  }
  

  // ============================================
  //    LẤY DANH SÁCH NGƯỜI DÙNG PHÂN TRANG
  // ============================================
  async getListUserPanigation(pageIndex: number, pageSize: number, res: Response) {
    try{
      // 1, 2, 3
      let index = (pageIndex - 1) * pageSize;  // =>0, 3, 6, 9
      if (index < 0){
        return failCode(res, '', 400, "pageIndex phải lớn hơn 0 !")
      }

      let data = await this.model.nguoiDung.findMany({
        skip: +index,     // Sử dụng skip thay vì offset
        take: +pageSize,  // Sử dụng take thay vì limit
        where: {
          isDelete: false,
        }
      });

      if (data.length === 0 ){
        return failCode(res, data, 400, "Không có dữ liệu !")
      }

      successCode(res, data, 200, "Thành công !")
    }
    catch (exception){
      console.log("🚀 ~ file: user.service.ts:85 ~ UserService ~ getListUserPanigation ~ exception:", exception)
      errorCode(res, "Lỗi BE")
    }
  }


  // ============================================
  //        TÌM TÊN NGƯỜI DÙNG THEO TÊN
  // ============================================ 
  async searchUserByName(userName: string, res: Response){
    try{
      let data = await this.model.nguoiDung.findMany({
        where:{
          ho_ten: {
            contains: userName      // LIKE '%userName%'
          },
          isDelete: false
        }
      });

      if (data.length === 0){
        return failCode(res, data, 400, "Không có dữ liệu kết quả tìm kiếm !")
      }

      successCode(res, data, 200, "Thành công !")
    }
    catch (exception){
      console.log("🚀 ~ file: user.service.ts:111 ~ UserService ~ searchUserByName ~ exception:", exception)
      errorCode(res, "Lỗi BE")
    }
  }


  // ========================================
  //      POST THÊM 1 ẢNH CỦA USER
  // ========================================
  async uploadImg(file: Express.Multer.File, userID: number, body: FileUploadDto, res: Response) {
    try {
      let { email } = body

      let checkUserID = await this.model.nguoiDung.findFirst({
        where: {
          nguoi_dung_id: +userID,
          email,
          isDelete: false
        },
      });

      if (checkUserID === null) {
        fs.unlink(process.cwd() + "/public/img/" + file.filename, (err) => {    // xóa file ảnh theo đường dẫn nếu người dùng ko tồn tại
          if (err) {
            console.error("Error deleting file:", err);
          }
        });

        return failCode(res, '', 400, "Email hoặc ID người dùng không tồn tại !")
      }

      const createdImage = await this.model.nguoiDung.update({
        where: {
          nguoi_dung_id: +userID,
        },
        data: {
          anh_dai_dien: file.filename,
          // duong_dan: process.cwd() + "/public/img/" + file.filename,
        }
      });

      successCode(res, file, 201, 'Thêm ảnh đại diện thành công !');
    }
    catch (exception) {
      console.log("🚀 ~ file: user.service.ts:234 ~ UserService ~ uploadImg ~ exception:", exception)
      errorCode(res, 'Lỗi BE !');
    }
  }


  // ============================================
  //             CẬP NHẬT NGƯỜI DÙNG 
  // ============================================  
  async updateUserById(userId: string, body: UserUpdateDto, res: Response){
    try{ 
      let {ho_ten, email, mat_khau, so_dien_thoai, ngay_sinh, gioi_tinh, tuoi} = body;

      let checkEmail = await this.model.nguoiDung.findFirst({
        where: {
          nguoi_dung_id: +userId,
          isDelete: false
        }
      });

      if (checkEmail === null){
        return failCode(res, checkEmail, 400, "Email hoặc người dùng ID không đúng !")
      }

      let newData = await this.model.nguoiDung.update({
        where: {
          nguoi_dung_id: +userId
        },
        data: {
          ho_ten,
          email,
          mat_khau: await bcrypt.hash(mat_khau, 10), //  thay đổi bcrypt.hashSync thành await bcrypt.hash để sử dụng hàm hash bất đồng bộ. Điều này cần thiết để tránh blocking thread chính khi mã hóa mật khẩu.
          so_dien_thoai,
          ngay_sinh,
          gioi_tinh,
          tuoi
        }
      });

      successCode(res, newData, 200, "Cập nhật thông tin thành công !")
    }
    catch(exception){
      console.log("🚀 ~ file: user.service.ts:166 ~ UserService ~ updateUserById ~ exception:", exception)
      errorCode(res, "Lỗi BE");
    }
  }


  // ============================================
  //                XÓA NGƯỜI DÙNG 
  // ============================================
  async deleteUserById(userId: string, res: Response){
    try{
      let data = await this.model.nguoiDung.findFirst({
        where:{
          nguoi_dung_id: +userId,
          isDelete: false
        },
      });

      if (data === null){
        return failCode(res, data, 400, "Người dùng không tồn tại !")
      }

      await this.model.nguoiDung.update({
        where: {
          nguoi_dung_id: +userId,
        },
        data:{
          isDelete: true
        }
      });

      successCode(res, data, 200, "Đã xóa người dùng thành công !")
    }
    catch (exception){
      console.log("🚀 ~ file: user.service.ts:120 ~ UserService ~ deleteUserById ~ exception:", exception)
      errorCode(res,"Lỗi BE")
    }
  }

}

