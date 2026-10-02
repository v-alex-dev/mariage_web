/*
  Warnings:

  - You are about to drop the `Rsvp` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RsvpSong` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Rsvp";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "RsvpSong";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Group" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "token" TEXT NOT NULL,
    "label" TEXT
);

-- CreateTable
CREATE TABLE "Guest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "groupId" INTEGER NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT,
    "attending" BOOLEAN,
    "songId" INTEGER,
    CONSTRAINT "Guest_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Guest_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GuestSong" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "guestId" INTEGER NOT NULL,
    "songId" INTEGER NOT NULL,
    CONSTRAINT "GuestSong_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "Guest" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "GuestSong_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Group_token_key" ON "Group"("token");

-- CreateIndex
CREATE UNIQUE INDEX "GuestSong_guestId_songId_key" ON "GuestSong"("guestId", "songId");
