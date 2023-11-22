import { Module } from '@nestjs/common';
import { DuacodersModule } from './duacoders/duacoders.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/app.config';
import { JoiValidationSchema } from './config/joi.validation';
import { CommonModule } from './common/common.module';
import { DepartmentsModule } from './departments/departments.module';
import { AuthModule } from './auth/auth.module';
import { CustomLogger } from './common/logger/logger.service';
import { FilesModule } from './files/files.module';
import { ExportFilesModule } from './export-files/export-files.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema
    }),
    DuacodersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: +process.env.MYSQL_DB_PORT,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      autoLoadEntities: process.env.TYPEORM_LOAD_ENTITIES === 'true' || false,
      synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true' || false,
    }),
    CommonModule,
    DepartmentsModule,
    AuthModule,
    FilesModule,
    ExportFilesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: 'Logger',
      useClass: CustomLogger
    }
  ],
})
export class AppModule {}
