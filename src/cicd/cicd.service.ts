import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { Response } from 'express';
import { errorCode, successCode } from 'src/Config/response';
import util from 'util'; // Sử dụng util.promisify

const execAsync = util.promisify(exec);

@Injectable()
export class CicdService {
  constructor() { }

  async updateCodeServer(res: Response) {
    try {
      const { stdout, stderr } = await execAsync("pwd"); // Sử dụng await để đợi cho lệnh hoàn thành
      console.log(stdout);
      successCode(res, "", 200, "Thành công !");
    } catch (exception) {
      console.error("🚀 ~ Exception:", exception);
      errorCode(res, "Lỗi BE !");
    }
  }
}
