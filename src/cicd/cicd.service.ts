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

      await exec('./../../script.sh', (error, stdout, stderr) => {
        if (error) {
          console.error(`error: ${error.message}`);
          return;
        }
      
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          return;
        }
      
        console.log(`stdout:\n${stdout}`);
      });
      successCode(res, "", 200, "Thành công !");

    } catch (exception) {
      console.error("🚀 ~ Exception:", exception);
      errorCode(res, "Lỗi BE !");
    }
  }

}
