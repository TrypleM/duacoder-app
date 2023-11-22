import { Controller, Post, UploadedFile, UseInterceptors, BadRequestException, UseGuards, Get, Param, Res } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/fileFilter.helper';
import { diskStorage } from 'multer';
import { fileNamer } from './helpers/fileNamer.helper';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Files')
@Controller('files')
@UseGuards(AuthGuard())
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService
    ) {}

  @Get('images/:imageName')
  @ApiResponse({status: 200, description: 'Exported csv'})
  @ApiResponse({status: 400, description: 'Bad request'})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  findImage(@Res()res: Response, @Param('imageName') imageName: string) {
    const path = this.filesService.getStaticImage(imageName);

    res.sendFile(path);
  }

  @Post('images')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter,
    storage: diskStorage({
      destination: './static/images',
      filename: fileNamer
    })
  }))
  uploadImage(@UploadedFile() file: Express.Multer.File) {

    if (!file) throw new BadRequestException('Make sure that the file is an image');
    
    const secureUrl = `${this.configService.get('hostApi')}/files/images/${file.filename}`;

    return { secureUrl };
  }
}
