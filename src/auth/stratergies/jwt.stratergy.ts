import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { User } from "../entities/user.entity";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectRepository(User)
        private readonly userRespository: Repository<User>,
        configService: ConfigService
    ) {
        super({
            secretOrKey: configService.get('jwtSecret'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        });
    }

    async validate(payload: JwtPayload): Promise<User> {
        const {id} = payload;

        const user = await this.userRespository.findOneBy({id});

        if (!user) throw new UnauthorizedException('Token not valid');

        return user;
    }
}