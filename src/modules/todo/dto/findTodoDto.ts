import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"
import { findDto } from "src/utils/dto/findDto"

export class FindTodoDto extends findDto {
    userId: string
} 