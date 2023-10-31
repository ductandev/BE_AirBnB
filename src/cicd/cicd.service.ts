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
      console.log("testtttttttttttttttttt")
      const { exec } = require('child_process');
      var yourscript = exec('sh /root/BE_AirBnB/src/cicd/script.sh',
              (error, stdout, stderr) => {
                  console.log(stdout);
                  console.log(stderr);
                  if (error !== null) {
                      console.log(`exec error: ${error}`);
                  }
              });
      successCode(res, "", 200, "Thành công !");

    } catch (exception) {
      console.error("🚀 ~ Exception:", exception);
      errorCode(res, "Lỗi BE !");
    }
  }
}
