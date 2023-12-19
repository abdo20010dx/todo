import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString } from "class-validator"

export class SigninDto {
    @ApiProperty({ example: "abdo@gmail.com" })
    @IsString()
    @IsEmail()
    email: string

    @ApiProperty({ example: "12345678" })
    @IsString()
    password: string

}