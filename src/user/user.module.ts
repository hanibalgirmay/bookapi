import { Module } from '@nestjs/common';
import { UserService } from './Service/user.service';
import { UserController } from './Controller/user.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtStrategy } from 'src/auth/Strategy/jwt.strategy';
import { JwtAuthGuard } from 'src/auth/Guard/jwt.auth.guard';

@Module({
  providers: [UserService, PrismaService, JwtAuthGuard, JwtStrategy],
  exports: [UserService],
  controllers: [UserController]
})
export class UserModule {}
