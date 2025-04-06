-- AlterTable
ALTER TABLE "Action" ADD COLUMN     "sortingOrder" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "ZapRun" ALTER COLUMN "metadata" SET DEFAULT '{}';
