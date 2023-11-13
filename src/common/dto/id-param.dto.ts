import { IsNotEmpty, IsNumberString } from 'class-validator';

export class IdParamDto {
  @IsNotEmpty()
  @IsNumberString()
  id: string;
}
