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
  updateCodeServer(res: Response) {
    try{
      exec("docker exec -it cons-be bash")
      exec("git pull")
      exec("exit")
      exec("docker restart cons-be")
      
      console.log("Success update code !!!")
      successCode(res, "",200, "Thành công !")
    }
    catch(exception){
      console.log("🚀 ~ file: cicd.service.ts:25 ~ CicdService ~ updateCodeServer ~ exception:", exception)
      errorCode(res, "Lỗi BE !")
    }
  }


  // ============================================
  //         TEST CI/CD AUTO UPDATE CODE
  // ============================================
  testCodeServer(res: Response) {
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
