import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { CommonService } from 'src/common/common.service';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';


@Injectable()
export class AuthService {

  private readonly logger = new Logger('Auth');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly commonService: CommonService
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto; 
      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10)
      });
      await this.userRepository.save(user);
      delete user.password;

      return {
        ...user, 
        token: this.getJwtToken({id: user.id})
      };
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;
    const user = await this.userRepository.findOne({
      where: {email: email.toLowerCase()},
      select: {email: true, password: true, id: true}
    });
    if (!user) throw new UnauthorizedException('Credentials are not valid');
    if (!bcrypt.compareSync(password, user.password)) throw new UnauthorizedException('Credentials are not valid');

    const id = user.id;
    delete user.id;
    return {
      ...user, 
      token: this.getJwtToken({id})
    };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
