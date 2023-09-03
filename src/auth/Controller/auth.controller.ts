import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from '../Service/auth.service';
import { LoginDto } from '../Dto/login.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity } from '../Entity/auth.entity';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    @ApiOkResponse({ type: AuthEntity })
    login(@Body(ValidationPipe) { email, password }: LoginDto) {
        return this.authService.login(email, password);
    }
}
