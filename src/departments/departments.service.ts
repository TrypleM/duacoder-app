import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Repository, FindOptionsWhere } from 'typeorm';
import { CommonService } from 'src/common/common.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { QueryParamsDto } from './entities/query-params.dto';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
    private readonly commonService: CommonService
  ) {}

  async create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    try {
      const department =  this.departmentRepository.create(createDepartmentDto);
      return await this.departmentRepository.save(department);
    } catch(error){
      this.commonService.handleDBExceptions(error);
    }
  }

  async findAll(queryParamsDto: QueryParamsDto): Promise<Department[]> {
    try {
      const { limit = 10, page = 1, orderby = 'name:ASC', ...filters } = queryParamsDto; 
      const field = orderby.split(':')[0];
      const order = orderby.split(':')[1] ? orderby.split(':')[1] : 'ASC';

      const findOptions: FindOptionsWhere<Department> = {};
      if (filters.id) findOptions.id = +filters.id;
      if (filters.name) findOptions.name = filters.name;
      
      return await this.departmentRepository.find({
        take: limit,
        skip: limit * (page -1),
        order: {
          [field]: order
        },
        where: findOptions
      });
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async findOne(id: number): Promise<Department> {
    try {
      const department = await this.departmentRepository.findOneBy({id});
      if (!department) throw new NotFoundException(`Departmentwith id ${id} not found`) 
      return department;
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto): Promise<Department> {
    try {
      const department = await this.departmentRepository.preload({...updateDepartmentDto, id});
      if (!department) throw new NotFoundException(`Department with id ${id} not found`);
      return await this.departmentRepository.save(department);
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    try {
      const department = await this.findOne(id);
      await this.departmentRepository.remove(department);
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }
}
