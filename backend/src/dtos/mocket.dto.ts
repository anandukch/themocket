import { IsNotEmpty, IsString } from "class-validator";

export class CreateMocketDto {
  @IsString()
  @IsNotEmpty()
  projectId!: string;

  @IsString()
  @IsNotEmpty()
  requestType!: string;

  @IsString()
  @IsNotEmpty()
  endpoint!: string;

  @IsString()
  @IsNotEmpty()
  requestHeaders?: string | Object;

  @IsString()
  @IsNotEmpty()
  requestBody!: string | Record<string, string> | Object;

  @IsString()
  @IsNotEmpty()
  responseBody!: string | Record<string, string> | Object;
}
