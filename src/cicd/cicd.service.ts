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
      await exec("docker exec -it cons-be bash -c 'git pull && exit' && docker restart cons-be", (error, stdout, stderr) => {
        if (error) {
          console.error("🚀 ~ Error:", error);
          errorCode(res, "Lỗi BE !");
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


  // ============================================
  //         TEST CI/CD AUTO UPDATE CODE
  // ============================================
  async testCodeServer(res: Response) {
    try{
      console.log("Success TEST code !!!")
      successCode(res, "",200, "Thành công !")
    }
    catch(exception){
      console.log("🚀 ~ file: cicd.service.ts:40 ~ CicdService ~ testCodeServer ~ exception:", exception)
      errorCode(res, "Lỗi BE !")
    }
  }

}
