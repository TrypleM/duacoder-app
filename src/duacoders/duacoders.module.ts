import { Module } from '@nestjs/common';
import { DuacodersService } from './duacoders.service';
import { DuacodersController } from './duacoders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Duacoder } from './entities/duacoder.entity';
import { CommonModule } from 'src/common/common.module';
import { DepartmentsModule } from 'src/departments/departments.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [DuacodersController],
  providers: [DuacodersService],
  imports: [
    TypeOrmModule.forFeature([Duacoder]),
    CommonModule,
    DepartmentsModule,
    AuthModule
  ],
  exports: [TypeOrmModule, DuacodersService]
})
export class DuacodersModule {}
