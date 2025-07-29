import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from "@nestjs/swagger";
import { CommentResponseDto } from '../../comments/dto/comment-response.dto';

export class PostSummaryDto {
  @ApiProperty({ example: "clx000000000000000000000", description: "Unique identifier of the post" })
  @Expose()
  id: string;

  @ApiProperty({ example: "My Awesome Blog Post", description: "Title of the blog post" })
  @Expose()
  title: string;

  @ApiProperty({ example: 5, description: "Number of comments on the post" })
  @Expose()
  commentCount: number;

  @ApiProperty({ example: "2024-07-29T12:00:00.000Z", description: "Date and time when the post was created" })
  @Expose()
  createdAt: Date;
}

export class PostWithCommentsDto {
  @ApiProperty({ example: "clx000000000000000000000", description: "Unique identifier of the post" })
  @Expose()
  id: string;

  @ApiProperty({ example: "My Awesome Blog Post", description: "Title of the blog post" })
  @Expose()
  title: string;

  @ApiProperty({ example: "This is the full content of my blog post.", description: "Full content of the blog post" })
  @Expose()
  content: string;

  @ApiProperty({ example: "2024-07-29T12:00:00.000Z", description: "Date and time when the post was created" })
  @Expose()
  createdAt: Date;

  @ApiProperty({ example: "2024-07-29T12:10:00.000Z", description: "Date and time when the post was last updated" })
  @Expose()
  updatedAt: Date;

  @ApiProperty({ type: [CommentResponseDto], description: "List of comments on the post" })
  @Expose()
  @Type(() => CommentResponseDto)
  comments: CommentResponseDto[];
}
