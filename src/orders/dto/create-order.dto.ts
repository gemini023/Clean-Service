import { IsNotEmpty, IsMongoId, IsEnum } from "class-validator";
import { Status } from "src/enums/enum-types";

export class CreateOrderDto {
    @IsNotEmpty()
    @IsMongoId()
    userId: string;
  
    @IsNotEmpty()
    @IsMongoId()
    serviceId: string;
  
    @IsEnum(Status)
    status: Status;
  }