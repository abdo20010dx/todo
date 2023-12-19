import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";
import {
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsNotIn,
  isNotIn,
  IsNumber,
  IsNumberString,
  IsObject,
  IsOptional,
  IsString,
} from "class-validator";
const theOrder = {}
export class findDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotIn(["0", 0])
  page?: number = 1

  @ApiProperty({ required: false })
  @IsOptional()
  @IsIn([0, 1, "0", "1", false, true, "false", "true", ""])
  withDeleted?: boolean;


  @IsOptional()
  @ApiProperty({ required: false })
  @IsNotIn(["0", 0])
  limit?: number = 10

  @IsOptional()
  @ApiProperty({ required: false })
  search?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  orderKey?: string = "id"

  @IsOptional()
  @ApiProperty({ required: false })
  orderValue?: string = "DESC"

  @IsOptional()
  order: any = () => {
    this.search = decodeURI(this.search)
    theOrder[this.orderKey] = this.orderValue;
    return theOrder
  }

}

export class findOneDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsIn([0, 1, "0", "1", false, true, "false", "true", ""])
  withDeleted?: boolean;

}
