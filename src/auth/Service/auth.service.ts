import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt'
import { AuthEntity } from '../Entity/auth.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) { }

    /**
     * 
     * @param email 
     * @param password 
     * @returns 
     */
    async login(email: string, password: string): Promise<AuthEntity> {
        // Step 1: Fetch a user with the given email
        const user = await this.prisma.user.findUnique({ where: { email: email } });

        // If no user is found, throw an error
        if (!user) {
            throw new NotFoundException(`No user found for email: ${email}`);
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        // If password does not match, throw an error
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid password');
        }

        // Step 3: Generate a JWT containing the user's ID and return it
        return {
            accessToken: this.jwtService.sign({ userId: user.id }),
        };
    }
}
