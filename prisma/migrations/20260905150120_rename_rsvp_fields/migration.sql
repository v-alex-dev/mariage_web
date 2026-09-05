/*
  Warnings:

  - You are about to drop the column `attenting` on the `Rsvp` table. All the data in the column will be lost.
  - You are about to drop the column `fullname` on the `Rsvp` table. All the data in the column will be lost.
  - Added the required column `attending` to the `Rsvp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `Rsvp` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Rsvp" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "attending" BOOLEAN NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Rsvp" ("createAt", "email", "id") SELECT "createAt", "email", "id" FROM "Rsvp";
DROP TABLE "Rsvp";
ALTER TABLE "new_Rsvp" RENAME TO "Rsvp";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
