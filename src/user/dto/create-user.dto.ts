import { IsEmail, IsNotEmpty, IsInt, IsStrongPassword, IsOptional, IsEnum } from 'class-validator';
import { Role } from '../enum/role.enum';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;
  
  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 6,
    minNumbers: 0,
    minUppercase: 0,
    minLowercase: 0,
    minSymbols: 0,
  })
  password: string;

  @IsOptional()
  @IsEnum(Role)
  role: number;
}
