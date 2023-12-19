import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ example: "abdo" })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: "abdo@gmail.com" })
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty({ example: "12345678" })
    @IsString()
    @IsNotEmpty()
    password: string

}
