import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { QueryParamsDto } from './entities/query-params.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Departments')
@UseGuards(AuthGuard())
@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post()
  @ApiResponse({status: 201, description: 'Department created'})
  @ApiResponse({status: 400, description: 'Bad request'})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  @ApiResponse({status: 404, description: 'Not found'})
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentsService.create(createDepartmentDto);
  }

  @Get()
  @ApiResponse({status: 200, description: 'Departments'})
  @ApiResponse({status: 400, description: 'Bad request'})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  findAll(@Query() queryParamsDto: QueryParamsDto) {
    return this.departmentsService.findAll(queryParamsDto);
  }

  @Get(':id')
  @ApiResponse({status: 200, description: 'Department'})
  @ApiResponse({status: 400, description: 'Bad request'})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  @ApiResponse({status: 404, description: 'Not found'})
  findOne(@Param('id') id: string) {
    return this.departmentsService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({status: 200, description: 'Department updated'})
  @ApiResponse({status: 400, description: 'Bad request'})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  @ApiResponse({status: 404, description: 'Not found'})
  update(@Param('id') id: string, @Body() updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentsService.update(+id, updateDepartmentDto);
  }

  @Delete(':id')
  @ApiResponse({status: 200, description: 'Department deleted'})
  @ApiResponse({status: 400, description: 'Bad request'})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  @ApiResponse({status: 404, description: 'Not found'})
  remove(@Param('id') id: string) {
    return this.departmentsService.remove(+id);
  }
}
