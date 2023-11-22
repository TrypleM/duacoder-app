import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateDuacoderDto } from './dto/create-duacoder.dto';
import { UpdateDuacoderDto } from './dto/update-duacoder.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Duacoder } from './entities/duacoder.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { CommonService } from 'src/common/common.service';
import { DepartmentsService } from 'src/departments/departments.service';
import { QueryParamsDto } from './dto/query-params.dto';

@Injectable()
export class DuacodersService {

  private readonly logger = new Logger('DuacoderService');

  constructor(
    @InjectRepository(Duacoder)
    private readonly duacoderRepository: Repository<Duacoder>,
    private readonly commonService: CommonService,
    private readonly departmentsService: DepartmentsService
  ) {}

  async create(createDuacoderDto: CreateDuacoderDto): Promise<Duacoder> {
    try {
      const department = await this.departmentsService.findOne(createDuacoderDto.department);
      const duacoder = this.duacoderRepository.create({...createDuacoderDto, department});
      const duacoderDB = await this.duacoderRepository.save(duacoder);
      return duacoderDB;
    } catch (error) {
      this.logger.error(error);
      this.commonService.handleDBExceptions(error);
    }
  }

  async findAll(queryParamsDto: QueryParamsDto): Promise<Duacoder[]> {
    try {
      const { limit = 1000, page = 1, orderby = 'name:ASC' , ...filters } = queryParamsDto;
      const field = orderby.split(':')[0];
      const order = orderby.split(':')[1] ? orderby.split(':')[1] : 'ASC';

      const findOptions: FindOptionsWhere<Duacoder> = {};
      if (filters.name) {findOptions.name = Like(`%${filters.name}%`);}
      if (filters.nif) findOptions.nif = filters.nif;
      if (filters.id) findOptions.id = filters.id;
      if (filters.position) findOptions.position = filters.position;
      if (filters.date) findOptions.date = filters.date;
      if (filters.department) findOptions.department = {name: filters.department};

      const duacoders = await this.duacoderRepository.find({
        take: limit,
        skip: limit * (page - 1),
        order: {
          [field]: order
        },
        where: findOptions,
        relations: ['department']
      });
      return duacoders;
    } catch(error) {
      this.logger.error(error);
      this.commonService.handleDBExceptions(error);
    }
  }

  async findOne(id: string): Promise<Duacoder> {
    try {
      const duacoder = await this.duacoderRepository.findOneBy({id});
      if (!duacoder) throw new NotFoundException(`Duacoder with id ${id} not found`);
      return duacoder;        
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async update(id: string, updateDuacoderDto: UpdateDuacoderDto) {
    try {
      let duacoderUpdate; 
      if (updateDuacoderDto.department) {
        const department = await this.departmentsService.findOne(updateDuacoderDto.department);
        duacoderUpdate = {
          ...updateDuacoderDto,
          id,
          department
        }
      } else {
        duacoderUpdate = {
          ...updateDuacoderDto,
          id
        }
      }
      const duacoder = await this.duacoderRepository.preload(duacoderUpdate);
      if (!duacoder) throw new NotFoundException(`Duacoder with id ${id} not found`);
      return await this.duacoderRepository.save(duacoder);
    } catch (error) {
      this.logger.error(error);
      this.commonService.handleDBExceptions(error);
    }

  }

  async remove(id: string) {
    try {
      const duacoder = await this.findOne(id);
      await this.duacoderRepository.remove(duacoder);
    } catch (error) {
      this.logger.error(error);
      this.commonService.handleDBExceptions(error);
    }
  }

}
