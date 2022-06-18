import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class AuthDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    firstname: string;

    @IsNotEmpty()
    @IsString()
    lastname: string;

    @IsOptional()
    @IsString()
    nickname?: string;
}