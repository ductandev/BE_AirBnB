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
      await exec("./../../script.sh", (error, stdout, stderr) => {
        if (error) {
          console.error("🚀 ~ Error:", error);
          errorCode(res, "Lỗi BE !");
          return;
        } else {
          console.log("Success update code !!!");
          successCode(res, "", 200, "Thành công !");
        }
      });

    } catch (exception) {
      console.error("🚀 ~ Exception:", exception);
      errorCode(res, "Lỗi BE !");
    }
  }

}
