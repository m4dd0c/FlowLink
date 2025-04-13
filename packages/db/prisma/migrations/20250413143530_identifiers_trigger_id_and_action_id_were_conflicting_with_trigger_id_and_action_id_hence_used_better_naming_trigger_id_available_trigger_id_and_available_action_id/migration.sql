/*
  Warnings:

  - You are about to drop the column `actionId` on the `Action` table. All the data in the column will be lost.
  - You are about to drop the column `triggerId` on the `Trigger` table. All the data in the column will be lost.
  - Added the required column `availableActionId` to the `Action` table without a default value. This is not possible if the table is not empty.
  - Added the required column `availableTriggerId` to the `Trigger` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Action" DROP CONSTRAINT "Action_actionId_fkey";

-- DropForeignKey
ALTER TABLE "Trigger" DROP CONSTRAINT "Trigger_triggerId_fkey";

-- AlterTable
ALTER TABLE "Action" DROP COLUMN "actionId",
ADD COLUMN     "availableActionId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Trigger" DROP COLUMN "triggerId",
ADD COLUMN     "availableTriggerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Trigger" ADD CONSTRAINT "Trigger_availableTriggerId_fkey" FOREIGN KEY ("availableTriggerId") REFERENCES "AvailableTriggers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_availableActionId_fkey" FOREIGN KEY ("availableActionId") REFERENCES "AvailableActions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
