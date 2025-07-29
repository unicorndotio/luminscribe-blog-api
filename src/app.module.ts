import { Module } from '@nestjs/common';

import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [PostsModule, CommentsModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
