import { ApiProperty } from '@nestjs/swagger';

export class ICreateProductsDTO {
  @ApiProperty()
  title: string;
}
