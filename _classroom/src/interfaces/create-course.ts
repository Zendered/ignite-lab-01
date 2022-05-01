import { ApiProperty } from '@nestjs/swagger';

export class CreateCourse {
  @ApiProperty()
  title: string;
  @ApiProperty({
    required: false,
  })
  slug?: string;
}
