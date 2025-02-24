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

import { z } from "zod";

export const ZodMocketSchema = z.object({
  requestType: z.string(),
  endpoint: z.string(),
  requestHeaders: z.string(),
  requestBody: z.string(),
  responseBody: z.string(),
});

// export type MocketDto = z.infer<typeof MocketSchema>;