import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommonModule } from 'src/common/common.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './stratergies/jwt.stratergy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User]),
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: ( configService: ConfigService) => {
        return {
          secret: configService.get('jwtSecret'),
          signOptions: {
            expiresIn: '1d'
          }
        }
      }
    }),
    CommonModule
  ],
  exports: [TypeOrmModule, JwtModule, JwtStrategy, PassportModule]
})
export class AuthModule {}
