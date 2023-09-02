import { Module } from '@nestjs/common';
import { AuthService } from './Service/auth.service';
import { AuthController } from './Controller/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/prisma.service';
import { JwtStrategy } from './Strategy/jwt.strategy';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    PassportModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '5m' }
    })],
  providers: [AuthService, PrismaService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule { }
