import { IsNumber, IsString } from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  readonly title: string;
  @IsString()
  readonly type: string;
  @IsString()
  readonly area: string;
  @IsNumber()
  readonly price: number;
  @IsString()
  readonly description?: string;
}
