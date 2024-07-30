import { IsString, IsNotEmpty, Length, IsEmail, IsEnum } from "class-validator"
import { Role } from "src/enums/enum-types"

export class CreateUserDto {
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
