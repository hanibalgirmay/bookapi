import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from '../Service/auth.service';
import { LoginDto } from '../Dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    // @UsePipes(ValidationPipe)
    login(@Body(ValidationPipe) { email, password }: LoginDto) {
        return this.authService.login(email, password);
    }
}
