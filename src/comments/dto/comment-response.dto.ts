import { Expose } from 'class-transformer';
import { ApiProperty } from "@nestjs/swagger";

export class CommentResponseDto {
  @ApiProperty({ example: "clx000000000000000000001", description: "Unique identifier of the comment" })
  @Expose()
  id: string;

  @ApiProperty({ example: "This is a great comment!", description: "Content of the comment" })
  @Expose()
  content: string;

  @ApiProperty({ example: "2024-07-29T12:05:00.000Z", description: "Date and time when the comment was created" })
  @Expose()
  createdAt: Date;
}
