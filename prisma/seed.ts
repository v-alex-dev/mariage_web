import 'dotenv/config';
import { PrismaClient } from '../app/generated/prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? 'file:./prisma/dev.db',
});
const prisma = new PrismaClient({ adapter });

// TODO: remplacer par la vraie liste fournie par Sophie & Nathan
const SONGS: { title: string; artist: string }[] = [
  { title: 'Perfect', artist: 'Ed Sheeran' },
  { title: "Can't Stop the Feeling!", artist: 'Justin Timberlake' },
  { title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars' },
];

async function main() {
  for (const song of SONGS) {
    await prisma.song.create({ data: song });
  }
  console.log(`✅ ${SONGS.length} chansons insérées.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
