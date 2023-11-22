import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentsService } from './departments.service';
import { DepartmentsController } from './departments.controller';
import { Department } from './entities/department.entity';
import { CommonModule } from 'src/common/common.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [DepartmentsController],
  providers: [DepartmentsService],
  imports: [
    TypeOrmModule.forFeature([Department]),
    CommonModule,
    AuthModule
  ],
  exports: [
    TypeOrmModule,
    DepartmentsService
  ]
})
export class DepartmentsModule {}
