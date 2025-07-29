import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  const post1 = await prisma.blogPost.create({
    data: {
      title: 'My First Seeded Post',
      content: "This is the content of my first seeded blog post. It's great!",
    },
  });
  console.log(`Created post with id: ${post1.id}`);

  await prisma.comment.create({
    data: {
      content: 'Awesome post! Loved it.',
      postId: post1.id,
    },
  });

  await prisma.comment.create({
    data: {
      content: 'Very insightful, thanks for sharing.',
      postId: post1.id,
    },
  });

  const post2 = await prisma.blogPost.create({
    data: {
      title: 'Another Seeded Post',
      content: 'This is the second seeded post, equally amazing.',
    },
  });
  console.log(`Created post with id: ${post2.id}`);

  await prisma.comment.create({
    data: {
      content: 'Great read!',
      postId: post2.id,
    },
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
