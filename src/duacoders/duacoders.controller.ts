import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards, Query, Res } from '@nestjs/common';
import { DuacodersService } from './duacoders.service';
import { CreateDuacoderDto } from './dto/create-duacoder.dto';
import { UpdateDuacoderDto } from './dto/update-duacoder.dto';
import { AuthGuard } from '@nestjs/passport';
import { QueryParamsDto } from './dto/query-params.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Duacoder } from './entities/duacoder.entity';

@ApiTags('Duacoders')
@Controller('duacoders')
@UseGuards(AuthGuard())
export class DuacodersController {
  constructor(private readonly duacodersService: DuacodersService) {}

  @Post()
  @ApiResponse({status: 201, description: 'Duacoder created', type: Duacoder})
  @ApiResponse({status: 400, description: 'Bad request'})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  create(@Body() createDuacoderDto: CreateDuacoderDto) {
    return this.duacodersService.create(createDuacoderDto);
  }

  @ApiResponse({status: 200, description: 'Duacoders', type: [Duacoder]})
  @ApiResponse({status: 400, description: 'Bad request'})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  @Get()
  findAll(@Query() queryParamsDto: QueryParamsDto) {
    return this.duacodersService.findAll(queryParamsDto);
  }

  @ApiResponse({status: 200, description: 'Duacoder', type: Duacoder})
  @ApiResponse({status: 400, description: 'Bad request'})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  @ApiResponse({status: 404, description: 'Not found'})
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.duacodersService.findOne(id);
  }

  @ApiResponse({status: 200, description: 'Duacoder updated', type: Duacoder})
  @ApiResponse({status: 400, description: 'Bad request'})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  @ApiResponse({status: 404, description: 'Not found'})
  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateDuacoderDto: UpdateDuacoderDto) {
    return this.duacodersService.update(id, updateDuacoderDto);
  }

  @ApiResponse({status: 200, description: 'Duacoder removed'})
  @ApiResponse({status: 400, description: 'Bad request'})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  @ApiResponse({status: 404, description: 'Not found'})
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.duacodersService.remove(id);
  }

}
