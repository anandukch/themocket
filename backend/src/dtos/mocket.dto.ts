import { IsNotEmpty, IsString } from "class-validator";

export class MocketDto {
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
export class CreateMocketDto extends MocketDto {
  @IsString()
  @IsNotEmpty()
  projectId!: string;
}


export class CreateMocketAiDto {
  prompt!: string;
  projectId!: string;
}