import { Controller, Get, HttpCode, Res } from '@nestjs/common';
import { CicdService } from './cicd.service';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("CI/CD")
@Controller('api/cicd')
export class CicdController {
  constructor(private readonly cicdService: CicdService) {}

  // ============================================
  //           AUTO UPDATE CODE SERVER
  // ============================================
  @HttpCode(200)
  @Get("/update-code-server")
  updateCodeServer(@Res() res:Response){
    return this.cicdService.updateCodeServer(res)
  }
}
