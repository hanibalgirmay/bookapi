import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { UserService } from '../Service/user.service';
import { CreateUserDto } from '../Dto/create.user.dto';
import { UserEntity } from '../Entity/user.entity';
import { JwtAuthGuard } from 'src/auth/Guard/jwt.auth.guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        return new UserEntity(await this.userService.create(createUserDto));
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async findAll() {
        const users = await this.userService.findAll();
        return users.map((user) => new UserEntity(user));
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return new UserEntity(await this.userService.findOne(id));
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: CreateUserDto,
    ) {
        return new UserEntity(await this.userService.update(id, updateUserDto));
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async remove(@Param('id', ParseIntPipe) id: number) {
        return new UserEntity(await this.userService.remove(id));
    }
}
