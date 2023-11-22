import { join } from 'path';
import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';

@Injectable()
export class FilesService {

  getStaticImage(imageName: string) {
    const path = join(__dirname, '../../static/images', imageName);
    
    if (!existsSync(path)) throw new BadRequestException(`Not found image with name ${imageName}`);

    return path;
  }
}
