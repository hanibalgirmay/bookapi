import { Request, Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { UserService } from '../Service/user.service';
import { CreateUserDto } from '../Dto/create.user.dto';
import { UserEntity } from '../Entity/user.entity';
import { JwtAuthGuard } from 'src/auth/Guard/jwt.auth.guard';
import { ApiCreatedResponse, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('Users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    @ApiCreatedResponse({ type: UserEntity })
    async create(@Body() createUserDto: CreateUserDto, @Request() req) {
        return new UserEntity(await this.userService.create(createUserDto));
    }

    @Get()
    @ApiResponse({ status: 200, description: 'Protected endpoint' })
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ type: UserEntity, isArray: true })
    async findAll() {
        const users = await this.userService.findAll();
        return users.map((user) => new UserEntity(user));
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiResponse({ status: 200, description: 'Protected endpoint' })
    @ApiOkResponse({ type: UserEntity })
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return new UserEntity(await this.userService.findOne(id));
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @ApiResponse({ status: 200, description: 'Protected endpoint' })
    @ApiCreatedResponse({ type: UserEntity })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: CreateUserDto,
    ) {
        return new UserEntity(await this.userService.update(id, updateUserDto));
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiResponse({ status: 200, description: 'Protected endpoint' })
    @ApiOkResponse({ type: UserEntity })
    async remove(@Param('id', ParseIntPipe) id: number) {
        return new UserEntity(await this.userService.remove(id));
    }
}
