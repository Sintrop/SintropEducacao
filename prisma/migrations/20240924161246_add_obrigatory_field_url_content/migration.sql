/*
  Warnings:

  - Made the column `urlContent` on table `Content` required. This step will fail if there are existing NULL values in that column.
  - Made the column `urlContent` on table `Episode` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Content" ALTER COLUMN "urlContent" SET NOT NULL;

-- AlterTable
ALTER TABLE "Episode" ALTER COLUMN "urlContent" SET NOT NULL;
