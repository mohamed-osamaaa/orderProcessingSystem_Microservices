import {
    IsEmail,
    IsString,
    MinLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({ example: 'user@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: '123456' })
    @IsString()
    @MinLength(6)
    password: string;
}
