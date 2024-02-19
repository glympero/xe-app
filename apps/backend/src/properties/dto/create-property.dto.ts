import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { CreateAreaDto } from './create-area.dto';
import { Type } from 'class-transformer';

export class CreatePropertyDto {
  @IsString()
  readonly title: string;
  @IsString()
  readonly type: string;

  @ValidateNested()
  @Type(() => CreateAreaDto)
  readonly area: CreateAreaDto;
  @IsNumber()
  readonly price: number;
  @IsString()
  readonly description?: string;
}
