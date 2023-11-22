import { Module } from '@nestjs/common';
import { ExportFilesService } from './export-files.service';
import { ExportFilesController } from './export-files.controller';
import { DuacodersModule } from 'src/duacoders/duacoders.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ExportFilesController],
  providers: [ExportFilesService],
  imports: [DuacodersModule, AuthModule]
})
export class ExportFilesModule {}
