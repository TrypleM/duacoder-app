import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CustomLogger } from './logger/logger.service';

@Module({
  controllers: [],
  providers: [CommonService, CustomLogger],
  exports: [CommonService, CustomLogger]
})
export class CommonModule {}
