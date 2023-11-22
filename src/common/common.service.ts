import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class CommonService {

  handleDBExceptions(error: any) {
    if (error.errno === 1062) {
      throw new BadRequestException(error.sqlMessage);
    }
    if (error.status === 404) {
      throw error;
    }
    throw new InternalServerErrorException('Unexpected error');
  }
}
