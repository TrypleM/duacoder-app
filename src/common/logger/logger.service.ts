// logger.service.ts
import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';

const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.simple(),
);

const logger = winston.createLogger({
  format: logFormat,
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/logs.log' }),
  ]
});

@Injectable()
export class CustomLogger implements LoggerService {
  log(message: string) {
    logger.info(message);
  }

  error(message: string, trace: string) {
    logger.error(message, trace);
  }

  warn(message: string) {
    logger.warn(message);
  }

  debug(message: string) {
    logger.debug(message);
  }

  verbose(message: string) {
    logger.verbose(message);
  }
}
