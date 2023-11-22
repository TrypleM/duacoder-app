import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { ExportFilesService } from './export-files.service';
import { DuacodersService } from '../duacoders/duacoders.service';
import { QueryParamsDto } from 'src/duacoders/dto/query-params.dto';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Export Files')
@Controller('export-files')
@UseGuards(AuthGuard())
export class ExportFilesController {
  constructor(
    private readonly exportFilesService: ExportFilesService,
    private readonly duacodersService: DuacodersService
    ) {}

  @Get('duacoders-csv')
  @ApiResponse({status: 200, description: 'Exported csv'})
  @ApiResponse({status: 400, description: 'Bad request'})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  async exportToCsv(@Query() queryParamsDto: QueryParamsDto, @Res() res: Response): Promise<void> {
    const duacoders = await this.duacodersService.findAll(queryParamsDto);
    const csv = await this.exportFilesService.exportToCsv(duacoders);

    res.header('Content-Type', 'text/csv');
    res.attachment('duacoders.csv');
    res.send(csv);
  }
}
