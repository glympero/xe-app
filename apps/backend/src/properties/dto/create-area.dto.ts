import { IsString } from 'class-validator';

export class CreateAreaDto {
  @IsString()
  readonly placeId: string;

  @IsString()
  readonly mainText: string;

  @IsString()
  readonly secondaryText: string;
}
