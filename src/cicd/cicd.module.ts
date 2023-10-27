import { Module } from '@nestjs/common';
import { CicdService } from './cicd.service';
import { CicdController } from './cicd.controller';

@Module({
  controllers: [CicdController],
  providers: [CicdService],
})
export class CicdModule {}
