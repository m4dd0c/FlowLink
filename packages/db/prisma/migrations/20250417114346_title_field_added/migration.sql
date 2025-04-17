/*
  Warnings:

  - Added the required column `title` to the `Action` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Trigger` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Action" ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Trigger" ADD COLUMN     "title" TEXT NOT NULL;
