import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { Response } from 'express';
import { errorCode, successCode } from 'src/Config/response';


@Injectable()
export class CicdService {
  constructor() { }

  // ============================================
  //           AUTO UPDATE CODE SERVER
  // ============================================
  async updateCodeServer(res: Response) {
    try {
      const { exec } = require('child_process');

      // Đảm bảo rằng biến PATH đã được thiết lập cụ thể
      process.env.PATH = '/usr/bin:/usr/local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin';

      // await exec("docker exec -it cons-be bash -c 'git pull && exit' && docker restart cons-be", (error, stdout, stderr) => {
      exec("docker -v", (error, stdout, stderr) => {
        if (error) {
          console.error("🚀 ~ Error:", error);
          errorCode(res, "Lỗi BE !");
        } else {
          console.log("Success update code !!!");
          console.log('Docker version:', stdout);
          successCode(res, "", 200, "Thành công !");
        }
      });
    } catch (exception) {
      console.error("🚀 ~ Exception:", exception);
      errorCode(res, "Lỗi BE !");
    }
  }

  // sfsfdsfsdfsd
}
