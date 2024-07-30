import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from "class-validator"
import { Role } from "../../enums/enum-types"

export class SignUpDto {
    
    @IsString()
    @IsNotEmpty()
    @Length(4, 30)
    userName: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    @Length(8)
    password: string
    
    @IsEnum(Role)
    role?: Role = Role.User
}
