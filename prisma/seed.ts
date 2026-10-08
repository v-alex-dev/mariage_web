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
  const existing = await prisma.song.findMany({ select: { title: true, artist: true } });
  const existingKeys = new Set(existing.map((s) => `${s.title}|||${s.artist}`));
  const toInsert = SONGS.filter((s) => !existingKeys.has(`${s.title}|||${s.artist}`));

  if (toInsert.length === 0) {
    console.log('ℹ️  Toutes les chansons existent déjà — rien à insérer.');
    return;
  }

  await prisma.song.createMany({ data: toInsert });
  console.log(
    `✅ ${toInsert.length} chanson(s) insérée(s) (${SONGS.length - toInsert.length} déjà présente(s)).`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
