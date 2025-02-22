import "reflect-metadata";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;
}

export class GoogleUserDto {
  @IsEmail()
  email!: string;

  @IsString()
  name!: string;

  @IsString()
  picture!: string;
}
