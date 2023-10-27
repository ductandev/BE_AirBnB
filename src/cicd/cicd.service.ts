import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { Response } from 'express';
import { errorCode, successCode } from 'src/Config/response';


@Injectable()
export class CicdService {
  constructor() { }

  updateCodeServer(res: Response) {
    try{
      exec("docker exec -it cons-be bash")
      exec("git pull")
      exec("exit")
      exec("docker restart cons-be")
      successCode(res, "",200, "Thành công !")
    }
    catch(exception){
      console.log("🚀 ~ file: cicd.service.ts:15 ~ CicdService ~ updateCodeServer ~ exception:", exception)
      errorCode(res, "Lỗi BE !")
    }
  }

}
