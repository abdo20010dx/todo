import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTodoDto {
    userId: string;

    @ApiProperty({ example: "task" })
    @IsNotEmpty()
    @IsString()
    task: string;

}
