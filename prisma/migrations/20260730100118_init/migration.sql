-- CreateTable
CREATE TABLE "Song" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "artist" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Rsvp" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fullname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "attenting" BOOLEAN NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "RsvpSong" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rsvpId" INTEGER NOT NULL,
    "songId" INTEGER NOT NULL,
    CONSTRAINT "RsvpSong_rsvpId_fkey" FOREIGN KEY ("rsvpId") REFERENCES "Rsvp" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "RsvpSong_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "RsvpSong_rsvpId_songId_key" ON "RsvpSong"("rsvpId", "songId");
